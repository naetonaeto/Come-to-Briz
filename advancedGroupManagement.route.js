// advancedGroupManagement.route.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Group = mongoose.model('Group', groupSchema);

router.get('/api/groups', async (req, res) => {
  const groups = await Group.find();
  res.send(groups);
});

router.post('/api/select-group', async (req, res) => {
  const groupId = req.body.groupId;
  const group = await Group.findById(groupId);
  // Update user's group preference
  res.send({ message: 'Group selected' });
});

module.exports = router;