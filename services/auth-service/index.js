require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const axios = require('axios');
const mongoose = require('mongoose');
const User = require('/app/models/userModel');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));

// Configure Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
}, async (accessToken, refreshToken, profile, cb) => {
  try {
    const email = profile.emails[0].value.toLowerCase().trim(); 
    console.log(`Received login for email: ${email}`);

    // Define the supervisor email explicitly
    const SUPERVISOR_EMAIL = 'skudsi490@gmail.com';  // Set the exact supervisor email here, I used my email for example
    const isSupervisor = (email === SUPERVISOR_EMAIL);
    const expectedRole = isSupervisor ? 'supervisor' : 'user';

    console.log(`Expected role for this email (${email}): ${expectedRole}`);

    // Find or create the user in the database
    let user = await User.findOne({ email });
    if (!user) {
      console.log(`User not found, creating new user with role: ${expectedRole}`);
      user = await User.create({ email, role: expectedRole });
    } else {
      console.log(`Existing user role in DB: ${user.role}, expected role: ${expectedRole}`);
      // Check and update role if it does not match the expected role
      if (user.role !== expectedRole) {
        console.log(`Updating user role in database from ${user.role} to ${expectedRole}`);
        user.role = expectedRole;
        await user.save();  // Ensure the save operation completes
        console.log(`User role updated successfully in database to: ${user.role}`);
      } else {
        console.log(`User role is correct in database as: ${user.role}`);
      }
    }

    // Log the final user object from the database
    user = await User.findOne({ email }); 
    console.log(`Final user record from DB: ${JSON.stringify(user)}`);

    cb(null, user);
  } catch (err) {
    console.error('Error in Google strategy callback:', err);
    cb(err);
  }
}));

// Serialize and deserialize user for session management
passport.serializeUser((user, cb) => cb(null, user.id));
passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findById(id);
    console.log(`Deserialized user with role: ${user.role}`);
    cb(null, user);
  } catch (err) {
    cb(err);
  }
});

app.use(passport.initialize());
app.use(passport.session());

// Route for Google OAuth login
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), async (req, res) => {
  console.log('Entered Google OAuth callback');
  
  try {
    console.log(`Authenticated user email: ${req.user.email}, role: ${req.user.role}`);
    
    // Send login notification to notification service
    await axios.get(`http://notification-service:4001/notify-login?email=${req.user.email}`);
    
    const redirectUrl = req.user.role === 'supervisor' ? 'http://localhost:3000/approval-dashboard' : 'http://localhost:3000/dashboard';
    console.log(`Redirecting to: ${redirectUrl}`);
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('Error in callback:', error);
    res.status(500).send('Failed to handle callback');
  }
});

// Logout route
app.get('/logout', async (req, res) => {
  // Send logout notification
  try {
    await axios.get(`http://notification-service:4001/notify-logout?email=${req.user.email}`);
  } catch (error) {
    console.error('Error sending logout notification:', error);
    return res.status(500).send('Failed to send notification');
  }

  // Log out the user from the session
  req.logout((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.status(500).send('Failed to log out');
    }
    res.redirect('http://localhost:3000/');
  });
});



app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`));
