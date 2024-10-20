// customizableThemes.route.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
  name: String,
  styles: Object,
});

const Theme = mongoose.model('Theme', themeSchema);

router.get('/api/themes', async (req, res) => {
  const themes = await Theme.find();
  res.send(themes);
});

router.post('/api/select-theme', async (req, res) => {
  const themeId = req.body.themeId;
  const theme = await Theme.findById(themeId);
  // Update user's theme preference
  res.send({ message: 'Theme selected' });
});

module.exports = router;