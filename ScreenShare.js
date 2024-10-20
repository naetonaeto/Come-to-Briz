// ScreenShare.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ScreenShare() {
  const [stream, setStream] = useState(null);

  useEffect(() => {
    navigator.mediaDevices.getDisplayMedia({ video: true })
      .then((mediaStream) => {
        setStream(mediaStream);
      })
      .catch((error) => {
        // Handle error
      });
  }, []);

  const handleShareScreen = async () => {
    if (!sharing) {
      setSharing(true);
      // Start screen sharing
      await axios.post('/api/screen-share', {
        stream: stream.id,
      });
    } else {
      setSharing(false);
      // Stop screen sharing
      await axios.post('/api/stop-screen-share');
    }
  };

  return (
    <div>
      <h1>Screen Sharing</h1>
      {sharing ? (
        <button onClick={handleShareScreen}>Stop Sharing</button>
      ) : (
        <button onClick={handleShareScreen}>Share Screen</button>
      )}
    </div>
  );
}