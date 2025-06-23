const express = require('express');
const router = express.Router();
const Application = require('../models/Application');


router.post('/applications', async (req, res) => {
  try {
    const {
      name, email, mobile, experience,
      jobId, jobTitle, recruiterEmail
    } = req.body;

    await Application.create({
      name,
      email,
      mobile,
      experience,
      jobId,
      jobTitle, // ✅ Save job title here
      recruiterEmail
    });

    res.json({ message: 'Application submitted' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving application' });
  }
});


router.get('/jobs/applications', async (req, res) => {
  try {
    const { email } = req.query;
    const applications = await Application.find({ recruiterEmail: email });
    res.json({ applications });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching applications' });
  }
});

// Fetch applications for a specific employee
router.get('/applications/user', async (req, res) => {
  try {
    const { email } = req.query;
    const applications = await Application.find({ email }).select('jobId');
    res.json({ applications });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user applications' });
  }
});

module.exports = router;
