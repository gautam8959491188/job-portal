const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('../src/routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);


const jobRoutes = require('../src/routes/jobRoutes');
app.use('/api/jobs', jobRoutes);

const applicationRoutes = require('../src/routes/applicationRoutes.js');
app.use('/api', applicationRoutes);



mongoose.connect("mongodb+srv://gautamupadhyay142000:8959491188@cluster0.otvloda.mongodb.net/")
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log('✅ Server running on port 5000');
    });
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
