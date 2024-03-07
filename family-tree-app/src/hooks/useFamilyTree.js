import { useState, useEffect } from 'react';

const useFamilyTree = () => {
  const [familyTree, setFamilyTree] = useState([]);

  const fetchFamilyData = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/family-members');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch family data:', error);
      return [];
    }
  };

  const initializeFamilyTreeWithRoot = (data) => {
    return data.find(member => member.firstName === 'Mohammad' && member.lastName === 'Bou Ajram');
  };

  const populateGenerations = (currentMember, currentGenerationIndex, data, tempFamilyTree) => {
    const children = data.filter(member => member.father === currentMember._id);
  
    if (children.length > 0) {
      if (!tempFamilyTree[currentGenerationIndex + 1]) {
        tempFamilyTree[currentGenerationIndex + 1] = [];
      }
  
      tempFamilyTree[currentGenerationIndex + 1].push(...children);
    }

    children.forEach(child => {
      populateGenerations(child, currentGenerationIndex + 1, data, tempFamilyTree);
    });
  };

  useEffect(() => {
    const buildFamilyTree = async () => {
      const data = await fetchFamilyData();
      const rootMember = initializeFamilyTreeWithRoot(data);
      
      if (rootMember) {
        let tempFamilyTree = [[rootMember]];
        populateGenerations(rootMember, 0, data, tempFamilyTree);
        setFamilyTree(tempFamilyTree);
      }
    };

    buildFamilyTree();
  }, []);

  console.log("this is the family tree:", familyTree);
  return { familyTree };
};

export default useFamilyTree;
