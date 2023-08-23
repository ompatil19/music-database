import React, { useState } from 'react';

function App() {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    // Handle search functionality here using the searchText state
    console.log('Searching for:', searchText);
  };

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Enter search text"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default App;
