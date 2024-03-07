// Filename: server.js

require('dotenv').config(); // Ensure you have dotenv installed (`npm install dotenv`) and a .env file at your project root
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS

const app = express();
const port = process.env.PORT || 4000;

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// MongoDB Atlas connection string
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// FamilyMember Routes
const familyMemberRoutes = require('./routes/familyMembers'); // Adjust the path as necessary
app.use('/api/family-members', familyMemberRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
