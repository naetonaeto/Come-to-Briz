// GroupChat.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GroupChat() {
  const [groupId, setGroupId] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groupMembers, setGroupMembers] = useState([]);
  const [newMember, setNewMember] = useState('');

  useEffect(() => {
    axios.get('/api/groups')
      .then((response) => {
        setGroupMembers(response.data);
      })
      .catch((error) => {
        // Handle error
      });
  }, []);

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/groups', {
        name: groupName,
      });
      setGroupId(response.data.id);
    } catch (error) {
      // Handle error
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/groups/members', {
        groupId,
        memberId: newMember,
      });
      setGroupMembers([...groupMembers, response.data]);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <h1>Group Chat</h1>
      <form onSubmit={handleCreateGroup}>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Group Name"
        />
        <button type="submit">Create Group</button>
      </form>
      <ul>
        {groupMembers.map((member) => (
          <li key={member.id}>{member.name}</li>
        ))}
      </ul>
      <form onSubmit={handleAddMember}>
        <input
          type="text"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          placeholder="New Member ID"
        />
        <button type="submit">Add Member</button>
      </form>
    </div>
  );
}