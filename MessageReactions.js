// MessageReactions.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MessageReactions() {
  const [reactions, setReactions] = useState([]);

  useEffect(() => {
    axios.get('/api/message-reactions')
      .then((response) => {
        setReactions(response.data);
      })
      .catch((error) => {
        // Handle error
      });
  }, []);

  const handleAddReaction = async (reaction) => {
    try {
      await axios.post('/api/add-reaction', {
        reaction,
        messageId: req.params.messageId,
      });
      setReactions([...reactions, reaction]);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <h1>Message Reactions</h1>
      <ul>
        {reactions.map((reaction) => (
          <li key={reaction.id}>{reaction.emoji}</li>
        ))}
      </ul>
      <button onClick={() => handleAddReaction('👍')}>Add Reaction</button>
    </div>
  );
}