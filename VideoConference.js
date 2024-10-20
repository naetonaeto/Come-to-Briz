// VideoConference.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VideoConference() {
  const [stream, setStream] = useState(null);
  const [callId, setCallId] = useState('');

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setStream(mediaStream);
      })
      .catch((error) => {
        // Handle error
      });
  }, []);

  const handleJoinCall = async () => {
    const response = await axios.post('/api/join-call', {
      callId,
    });
    // Handle join call success
  };

  const handleCreateCall = async () => {
    const response = await axios.post('/api/create-call');
    setCallId(response.data.callId);
    // Handle create call success
  };

  return (
    <div>
      <h1>Video Conferencing</h1>
      {callId ? (
        <button onClick={handleJoinCall}>Join Call</button>
      ) : (
        <button onClick={handleCreateCall}>Create Call</button>
      )}
    </div>
  );
}