// FileShare.js
import React, { useState } from 'react';
import axios from 'axios';

function FileShare() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const response = await axios.post('/api/files', {
        file,
      });
      // Handle upload success
    } catch (error) {
      // Handle upload error
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1>File Sharing</h1>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          onChange={handleFileChange}
        />
        <button type="submit">Upload File</button>
        {uploading && <p>Uploading...</p>}
      </form>
    </div>
  );
}