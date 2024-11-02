require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const Request = require('/app/models/requestModel');

const app = express();
const PORT = process.env.PORT || 4002;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());

// Fetch all requests
app.get('/requests', async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).send('Failed to fetch requests');
  }
});

app.post('/create-request', async (req, res) => {
  const { title, description, type, urgency, requesterEmail, approverEmail } = req.body;
  const newRequest = new Request({ title, description, type, urgency, requesterEmail, approverEmail });
  await newRequest.save();

  try {
    await axios.get(`http://notification-service:4001/notify-request?requesterEmail=${requesterEmail}&approverEmail=${approverEmail}`);
    res.status(200).json({ message: 'Request created successfully' });
  } catch (error) {
    console.error('Error sending request notification:', error);
    res.status(500).send('Failed to send notification');
  }
});

// Approve request and notify requester with details
app.post('/approve-request/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const request = await Request.findByIdAndUpdate(id, { status: 'Approved' }, { new: true });
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    const response = await axios.get('http://notification-service:4001/notify-request-approval', {
      params: {
        requestDetails: JSON.stringify(request), // Serialize the request object for transport
      }
    });
    res.status(200).json({ message: 'Request approved successfully' });
  } catch (error) {
    console.error('Error approving request:', error.response ? error.response.data : error.message);
    res.status(500).send('Failed to approve request');
  }
});

// Reject request and notify requester with details
app.post('/reject-request/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const request = await Request.findByIdAndUpdate(id, { status: 'Rejected' }, { new: true });
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    const response = await axios.get('http://notification-service:4001/notify-request-rejection', {
      params: {
        requestDetails: JSON.stringify(request), // Serialize the request object for transport
      }
    });
    res.status(200).json({ message: 'Request rejected successfully' });
  } catch (error) {
    console.error('Error rejecting request:', error.response ? error.response.data : error.message);
    res.status(500).send('Failed to reject request');
  }
});


app.listen(PORT, () => console.log(`Request service running on port ${PORT}`));
