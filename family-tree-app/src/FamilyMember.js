// src/FamilyMember.js
import React from 'react';
import './FamilyMember.css';

const FamilyMember = ({ member }) => {
  const profilePicture = member.photo || (member.gender === 'male' 
    ? '/images/default-male.png' // Replace with actual path
    : '/images/default-female.png'); // Replace with actual path

  return (
    <div className="family-member-card">
      <div 
        className="profile-picture"
        style={{ backgroundImage: `url(${profilePicture})` }}
      ></div>
      <div className="member-name">{`${member.firstName} ${member.lastName}`}</div>
      <div className="member-status">{member.isAlive === "yes" ? "Living" : "Deceased"}</div>
    </div>
  );
};

export default FamilyMember;
