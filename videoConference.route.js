// videoConference.route.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const callSchema = new mongoose.Schema({
  callId: String,
  userId: String,
});

const Call = mongoose.model('Call', callSchema);

router.post('/api/create-call', async (req, res) => {
  const call = new Call({
    callId: Math.random().toString(36).substr(2, 9),
    userId: req.user.id,
  });
  await call.save();
  res.send({ callId: call.callId });
});

router.post('/api/join-call', async (req, res) => {
  const { callId } = req.body;
  const call = await Call.findOne({ callId });
  if (!call) {
    return res.status(404).send({ message: 'Call not found' });
  }
  // Handle join call success
});

module.exports = router;