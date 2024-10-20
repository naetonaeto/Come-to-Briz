// screenShare.route.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const screenShareSchema = new mongoose.Schema({
  streamId: String,
  userId: String,
});

const ScreenShare = mongoose.model('ScreenShare', screenShareSchema);

router.post('/api/screen-share', async (req, res) => {
  const { streamId } = req.body;
  const screenShare = new ScreenShare({
    streamId,
    userId: req.user.id,
  });
  await screenShare.save();
  res.send({ message: 'Screen sharing started' });
});

router.post('/api/stop-screen-share', async (req, res) => {
  await ScreenShare.deleteMany({ userId: req.user.id });
  res.send({ message: 'Screen sharing stopped' });
});

module.exports = router;