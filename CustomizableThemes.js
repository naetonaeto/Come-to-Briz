// CustomizableThemes.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CustomizableThemes() {
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    axios.get('/api/themes')
      .then((response) => {
        setThemes(response.data);
      })
      .catch((error) => {
        // Handle error
      });
  }, []);

  const handleSelectTheme = async (themeId) => {
    try {
      await axios.post('/api/select-theme', {
        themeId,
      });
      setSelectedTheme(themeId);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <h1>Customizable Themes</h1>
      <ul>
        {themes.map((theme) => (
          <li key={theme.id}>
            <button onClick={() => handleSelectTheme(theme.id)}>
              {theme.name}
            </button>
          </li>
        ))}
      </ul>
      {selectedTheme && <p>Selected Theme: {selectedTheme}</p>}
    </div>
  );
}