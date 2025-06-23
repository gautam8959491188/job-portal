const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: String,
  salary: String,
  employmentType: { type: String, enum: ['Full-time', 'Part-time', 'Internship', 'Remote'], default: 'Full-time' },
  experienceRequired: String,
  skillsRequired: [String],
  postedBy: String,
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
