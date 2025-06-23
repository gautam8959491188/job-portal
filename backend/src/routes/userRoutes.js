const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// POST /api/users – Create profile for employee or recruiter
router.post('/', async (req, res) => {
  try {
    const {
      fullName, email, password, confirmPassword, role, phone,

      // Employee fields
      qualification, experience, skills, jobRole, expectedSalary,

      // Recruiter fields
      companyName, companyWebsite, companySize, industry,
      companyLocation, designation, hiringDepartments, linkedinUrl, bio
    } = req.body;

    // Role validation
    if (!['employee', 'recruiter'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Password check
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if email already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Base user object
    const userData = {
      fullName,
      email,
      password: hashedPassword,
      role,
      phone
    };

    if (role === 'employee') {
      userData.qualification = qualification;
      userData.experience = experience;
      userData.skills = skills?.split(',').map(s => s.trim());
      userData.jobRole = jobRole;
      userData.expectedSalary = expectedSalary;
    }

    if (role === 'recruiter') {
      userData.companyName = companyName;
      userData.companyWebsite = companyWebsite;
      userData.companySize = companySize;
      userData.industry = industry;
      userData.companyLocation = companyLocation;
      userData.designation = designation;
      userData.linkedinUrl = linkedinUrl;
    }

    // Create user
    const newUser = new User(userData);
    await newUser.save();

    return res.status(201).json({ message: 'User created successfully' });

  } catch (err) {
    console.error('Error creating user:', err.message);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Incorrect password' });

                return res.status(200).json({
              message: 'Login successful',
              role: user.role,
              fullName: user.fullName,
              email: user.email,
              id: user._id,
              skills: user.skills
              });
  } catch (err) {
    return res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

router.get('/applications/:recruiterEmail', async (req, res) => {
  try {
    const applications = await Application.find({ recruiterEmail: req.params.recruiterEmail });
    res.json({ applications });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching applications' });
  }
});

module.exports = router;