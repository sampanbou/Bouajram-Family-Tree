// src/components/FamilyMemberCard.js
import React from 'react';
import './FamilyMemberCard.css';

const FamilyMemberCard = ({ member }) => {

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

export default FamilyMemberCard;
