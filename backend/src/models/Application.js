// models/Application.js
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  experience: String,
  jobId: String,
  jobTitle: String, // ✅ Add this line
  recruiterEmail: String,
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Application', applicationSchema);