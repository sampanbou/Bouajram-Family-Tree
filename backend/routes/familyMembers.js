// Filename: familyMembers.js

const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const FamilyMember = require('../models/FamilyMember');
const fs = require('fs');

// Configure AWS
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// POST route to create a new family member
router.post('/', async (req, res) => {
  const { firstName, lastName, gender, father, mother, spouse, isAlive, birthday } = req.body;
  try {
    const newMember = new FamilyMember({ firstName, lastName, gender, father, mother, spouse, isAlive, birthday });
    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /api/family-members to fetch all family members
router.get('/', async (req, res) => {
  try {
    const members = await FamilyMember.find();
    console.log("Fetching family members:", members); // Add this line
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/family-members/:id to fetch a single family member by ID
router.get('/:id', async (req, res) => {
  try {
    const member = await FamilyMember.findById(req.params.id);
    if (member) {
      res.json(member);
    } else {
      res.status(404).json({ message: 'Family member not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/family-members/:id to update an existing family member
router.put('/:id', upload.none(), async (req, res) => {
  const { firstName, lastName, gender, father, mother, spouse, isAlive, birthday } = req.body;
  try {
    const updatedMember = await FamilyMember.findByIdAndUpdate(req.params.id, { firstName, lastName, gender, father, mother, spouse, isAlive, birthday }, { new: true });
    res.json(updatedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/family-members/:id to delete a family member
router.delete('/:id', async (req, res) => {
  try {
    const result = await FamilyMember.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Family member not found' });
    }
    res.json({ message: 'Family member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST route to upload a photo and associate it with a family member
router.post('/upload-photo/:id', upload.single('photo'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' });
  }

  const fileContent = fs.readFileSync(req.file.path);

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME, // Assuming you have your S3 Bucket name in environment variables
    Key: `${Date.now()}_${req.file.originalname}`,
    Body: fileContent,
    ContentType: req.file.mimetype
  };

  s3.upload(params, async (err, data) => {
    if (err) {
      console.error('Error uploading to S3:', err);
      return res.status(500).send({ message: 'Error uploading file' });
    }

    try {
      const familyMember = await FamilyMember.findById(req.params.id);
      if (!familyMember) {
        return res.status(404).send({ message: 'Family member not found' });
      }

      familyMember.photo = data.Location;
      await familyMember.save();

      fs.unlinkSync(req.file.path); // Clean up the uploaded file from local storage

      res.send({ message: 'Photo uploaded successfully', data: familyMember });
    } catch (dbErr) {
      console.error('Database operation failed:', dbErr);
      res.status(500).send({ message: 'Failed to update family member with photo URL' });
    }
  });
});

module.exports = router;
