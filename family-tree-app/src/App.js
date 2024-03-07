// Filename: src/App.js
import React from 'react';
import './App.css';
import FamilyTree from './FamilyTree'; // Import the FamilyTree component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Family Tree</h1>
        <FamilyTree /> {/* Use the FamilyTree component */}
      </header>
    </div>
  );
}

export default App;