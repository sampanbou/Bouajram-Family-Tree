// Filename: src/App.js

import React from 'react';
import useFamilyTree from './hooks/useFamilyTree'; // Adjust the import path as necessary
import FamilyMemberCard from './components/FamilyMemberCard'; // Adjust the import path as necessary
import './App.css'; // Ensure you have this if you're using external CSS

function App() {
  const { familyTree } = useFamilyTree(); // Use the custom hook to get the family tree

  return (
    <div className="App">
      <header className="App-header">
        <h1>Family Tree</h1>
        {familyTree.map((generation, genIndex) => (
          // Render a div for each generation (row)
          <div key={genIndex} className="generation-row">
            {generation.map((member, memberIndex) => (
              // Render a FamilyMemberCard for each member (column) within the generation
              <FamilyMemberCard key={member._id} member={member} />
            ))}
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;