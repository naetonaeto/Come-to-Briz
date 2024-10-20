// api/groups.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Group = mongoose.model('Group', groupSchema);

router.post('/api/groups', async (req, res) => {
  const group = new Group({
    name: req.body.name,
  });
  await group.save();
  res.send(group);
});

router.post('/api/groups/members', async (req, res) => {
  const groupId = req.body.groupId;
  const memberId = req.body.memberId;
  const group = await Group.findById(groupId);
  group.members.push(memberId);
  await group.save();
  res.send(group);
});

module.exports = router;