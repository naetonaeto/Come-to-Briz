// callRecording.route.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const callRecordingSchema = new mongoose.Schema({
  recording: Boolean,
  callId: String,
});

const CallRecording = mongoose.model('CallRecording', callRecordingSchema);

router.get('/api/call-recording', async (req, res) => {
  const callRecording = await CallRecording.findOne({ callId: req.params.callId });
  res.send(callRecording);
});

router.post('/api/start-recording', async (req, res) => {
  const callRecording = new CallRecording({
    recording: true,
    callId: req.params.callId,
  });
  await callRecording.save();
  res.send({ message: 'Recording started' });
});

router.post('/api/stop-recording', async (req, res) => {
  await CallRecording.updateOne({ callId: req.params.callId }, { recording: false });
  res.send({ message: 'Recording stopped' });
});

module.exports = router;