// /backend/src/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Common fields
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['employee', 'recruiter'],
    required: true,
  },
  phone: String,

  // Recruiter-specific
  companyName: String,
  companyWebsite: String,
  companySize: String,
  industry: String,
  companyLocation: String,
  designation: String,
  linkedinUrl: String,
  

  // Employee-specific
  qualification: String,
  experience: String,
  skills: [String],
  jobRole: String,
  expectedSalary: String,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
