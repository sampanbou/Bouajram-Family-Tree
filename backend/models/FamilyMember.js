// Filename: FamilyMember.js

const mongoose = require('mongoose');

const familyMemberSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
  father: { type: mongoose.Schema.Types.ObjectId, ref: 'FamilyMember', default: null },
  mother: { type: mongoose.Schema.Types.ObjectId, ref: 'FamilyMember', default: null },
  spouse: { type: mongoose.Schema.Types.ObjectId, ref: 'FamilyMember', default: null },
  photo: { type: String, default: null },
  approved: { type: Boolean, default: false },
  birthday: { type: Date, default: null },
  isAlive: { type: String, enum: ['yes', 'no', 'unknown'], default: 'unknown' }
});

const FamilyMember = mongoose.model('FamilyMember', familyMemberSchema, 'familyMembers');

module.exports = FamilyMember;
