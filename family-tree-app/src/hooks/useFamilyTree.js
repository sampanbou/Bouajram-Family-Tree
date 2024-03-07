// src/hooks/useFamilyTree.js

import { useState, useEffect } from 'react';

const useFamilyTree = () => {
  const [familyTree, setFamilyTree] = useState([]);

  // Fetch all family member data from the backend
  const fetchFamilyData = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/family-members');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch family data:', error);
      return [];
    }
  };

  // Initialize the family tree with Mohammad Bou Ajram as the root
  const initializeFamilyTreeWithRoot = (data) => {
    const rootMember = data.find(member => member.firstName === 'Mohammad' && member.lastName === 'Bou Ajram');
    if (!rootMember) {
      console.error('Root family member not found');
      return [];
    }
    
    // Initialize your familyTree with Mohammad as the first entry in the first generation
    let initialFamilyTree = [[rootMember]]; // Array of arrays with rootMember as the first entry
    
    return initialFamilyTree;
  };

  // Placeholder for a function to populate generations
  // This function should recursively populate children for each member
  const populateGenerations = (currentMember, currentGenerationIndex, data) => {
    // Placeholder logic
  };

  useEffect(() => {
    const buildFamilyTree = async () => {
      const data = await fetchFamilyData();
      let initialFamilyTree = initializeFamilyTreeWithRoot(data);
      // Here, you would call populateGenerations for each member of the initialFamilyTree to build out the full family structure
      // For demonstration, this call is commented out as the implementation depends on your data structure
      // populateGenerations(rootMember, 0, data); // Adjust this call according to your implementation
      setFamilyTree(initialFamilyTree);

    };

    buildFamilyTree();
  }, []);

  return { familyTree };
};

export default useFamilyTree;