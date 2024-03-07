// src/FamilyTree.js

import React, { useState, useEffect } from 'react';
import FamilyMember from './FamilyMember';

const FamilyTree = () => {
  const [familyMembers, setFamilyMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data from backend..."); // Before fetch
        const response = await fetch('http://localhost:4000/api/family-members');
        const data = await response.json();
        console.log("Data fetched:", data); // After receiving data
        setFamilyMembers(data);
      } catch (error) {
        console.error("Fetching error:", error); // If there's an error
      }
    };

    fetchData();
  }, []);

  return (
    <div className="family-tree">
      {familyMembers.map(member => (
        <FamilyMember key={member._id} member={member} />
      ))}
    </div>
  );
};

export default FamilyTree;
