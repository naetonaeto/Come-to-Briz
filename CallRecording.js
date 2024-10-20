// CallRecording.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CallRecording() {
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    axios.get('/api/call-recording')
      .then((response) => {
        setRecording(response.data.recording);
      })
      .catch((error) => {
        // Handle error
      });
  }, []);

  const handleStartRecording = async () => {
    try {
      await axios.post('/api/start-recording');
      setRecording(true);
    } catch (error) {
      // Handle error
    }
  };

  const handleStopRecording = async () => {
    try {
      await axios.post('/api/stop-recording');
      setRecording(false);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <h1>Call Recording</h1>
      {recording ? (
        <button onClick={handleStopRecording}>Stop Recording</button>
      ) : (
        <button onClick={handleStartRecording}>Start Recording</button>
      )}
    </div>
  );
}