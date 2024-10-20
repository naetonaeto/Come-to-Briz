// messageReactions.route.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const messageReactionSchema = new mongoose.Schema({
  emoji: String,
  messageId: String,
});

const MessageReaction = mongoose.model('MessageReaction', messageReactionSchema);

router.get('/api/message-reactions', async (req, res) => {
  const messageReactions = await MessageReaction.find({ messageId: req.params.messageId });
  res.send(messageReactions);
});

router.post('/api/add-reaction', async (req, res) => {
  const messageReaction = new MessageReaction({
    emoji: req.body.reaction,
    messageId: req.body.messageId,
  });
  await messageReaction.save();
  res.send({ message: 'Reaction added' });
});

module.exports = router;