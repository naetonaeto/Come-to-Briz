// AdvancedGroupManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdvancedGroupManagement() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    axios.get('/api/groups')
      .then((response) => {
        setGroups(response.data);
      })
      .catch((error) => {
        // Handle error
      });
  }, []);

  const handleSelectGroup = async (groupId) => {
    try {
      await axios.post('/api/select-group', {
        groupId,
      });
      setSelectedGroup(groupId);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <h1>Advanced Group Management</h1>
      <ul>
        {groups.map((group) => (
          <li key={group.id}>
            <button onClick={() => handleSelectGroup(group.id)}>
              {group.name}
            </button>
          </li>
        ))}
      </ul>
      {selectedGroup && <p>Selected Group: {selectedGroup}</p>}
    </div>
  );
}