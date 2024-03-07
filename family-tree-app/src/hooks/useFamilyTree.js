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
    const children = data.filter(member => member.father === currentMember._id || member.mother === currentMember._id);

    if (children.length > 0) {
      if (!tempFamilyTree[currentGenerationIndex + 1]) {
        tempFamilyTree[currentGenerationIndex + 1] = [];
      }

      children.forEach(child => {
        if (!tempFamilyTree[currentGenerationIndex + 1].includes(child)) {
          tempFamilyTree[currentGenerationIndex + 1].push(child);
        }
      });

      children.forEach(child => {
        populateGenerations(child, currentGenerationIndex + 1, data, tempFamilyTree);
      });
    }
  };

  const addSecondParentsToTheirCorrectGeneration = (data, tempFamilyTree) => {
    // Iterate from the second last generation upwards
    for (let genIndex = tempFamilyTree.length - 2; genIndex >= 0; genIndex--) {
      tempFamilyTree[genIndex].forEach((member, memberIndex) => {
        // Identify second parent for each child in the next generation
        tempFamilyTree[genIndex + 1].forEach(child => {
          let secondParentId = child.father === member._id ? child.mother : child.father;
          if (secondParentId && !tempFamilyTree[genIndex].find(m => m._id === secondParentId)) {
            const secondParent = data.find(p => p._id === secondParentId);
            if (secondParent) {
              // Ensure second parent is added next to the first parent
              tempFamilyTree[genIndex].splice(memberIndex + 1, 0, secondParent);
            }
          }
        });
      });
    }
  };

  useEffect(() => {
    const buildFamilyTree = async () => {
      const data = await fetchFamilyData();
      const rootMember = initializeFamilyTreeWithRoot(data);

      if (rootMember) {
        let tempFamilyTree = [[rootMember]];
        populateGenerations(rootMember, 0, data, tempFamilyTree);
        addSecondParentsToTheirCorrectGeneration(data, tempFamilyTree);
        setFamilyTree(tempFamilyTree);
      }
    };

    buildFamilyTree();
  }, []);

  return { familyTree };
};

export default useFamilyTree;
