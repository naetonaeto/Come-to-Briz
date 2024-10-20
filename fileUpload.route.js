// api/files.js
const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: './uploads/' });

router.post('/api/files', upload.single('file'), async (req, res) => {
  // Handle file upload
  res.send(req.file);
});

module.exports = router;