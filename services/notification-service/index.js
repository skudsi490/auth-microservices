require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4001;


app.use(cors({
    origin: 'http://localhost:3000',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  
    credentials: true  
  }));

  
// Transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT == 465,  
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Routes
app.get('/notify-login', (req, res) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: req.query.email,
    subject: 'Login Notification',
    text: 'You have successfully logged in.',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).send(error.toString());
    res.send('Login notification sent');
  });
});

app.get('/notify-logout', (req, res) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: req.query.email,
    subject: 'Logout Notification',
    text: 'You have successfully logged out.',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).send(error.toString());
    res.send('Logout notification sent');
  });
});

app.get('/notify-request', (req, res) => {
  const { requesterEmail, approverEmail } = req.query;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: `${requesterEmail}, ${approverEmail}`,
    subject: 'New Request Created',
    text: 'A new request has been created and is pending approval.',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).send(error.toString());
    res.send('Request notification sent');
  });
});

// Notify on request approval
app.get('/notify-request-approval', (req, res) => {
  const { requestDetails } = req.query;
  const request = JSON.parse(requestDetails); 

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: request.requesterEmail,
    subject: 'Request Approved',
    text: `Your request has been approved.\n\nDetails:\nID: ${request._id}\nTitle: ${request.title}\nDescription: ${request.description}\nType: ${request.type}\nUrgency: ${request.urgency}\n\nThank you.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).send(error.toString());
    res.send('Approval notification sent');
  });
});

// Notify on request rejection
app.get('/notify-request-rejection', (req, res) => {
  const { requestDetails } = req.query;
  const request = JSON.parse(requestDetails); // Parse details since they are sent as a string

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: request.requesterEmail,
    subject: 'Request Rejected',
    text: `Your request has been rejected.\n\nDetails:\nID: ${request._id}\nTitle: ${request.title}\nDescription: ${request.description}\nType: ${request.type}\nUrgency: ${request.urgency}\n\nPlease contact your supervisor for more information.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).send(error.toString());
    res.send('Rejection notification sent');
  });
});


app.listen(PORT, () => console.log(`Notification service running on port ${PORT}`));
