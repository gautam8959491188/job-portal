const express = require('express');
const Job = require('../models/Job');
const router = express.Router();

// POST /api/jobs
router.post('/', async (req, res) => {
  try {
    const {
      title, description, location, salary,
      employmentType, experienceRequired, skillsRequired, postedBy
    } = req.body;

    const job = new Job({
      title,
      description,
      location,
      salary,
      employmentType,
      experienceRequired,
      skillsRequired: skillsRequired.map(s => s.trim()),
      postedBy,
    });

    await job.save();
    res.status(201).json({ message: 'Job posted successfully', job });

  } catch (err) {
    console.log(err);                                                           
    res.status(500).json({ message: 'Error posting job', error: err.message });
  }
});

router.get('/', async (req, res) => {
  const { postedBy } = req.query;
  console.log('postedBy:', postedBy);
  try {
    const jobs = await Job.find({ postedBy });
    res.json({ jobs });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});



// GET jobs matching employee's skills
router.get('/recommended', async (req, res) => {
  const { skills } = req.query;

  if (!skills) {
    return res.status(400).json({ message: 'No skills provided' });
  }

  const skillArray = skills.split(',').map(skill => skill.trim());

  try {
    const jobs = await Job.find({
      skillsRequired: { $in: skillArray }
    });

    res.json({ jobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching recommended jobs' });
  }
});

module.exports = router;


