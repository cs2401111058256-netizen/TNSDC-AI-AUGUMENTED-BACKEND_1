const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import Routes
const authRoutes = require('./src/routes/auth');
const materialRoutes = require('./src/routes/materials');
const adminRoutes = require('./src/routes/admin');
const aiRoutes = require('./src/routes/ai'); // Puthusa add panniyachu 🚀

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes); // Puthusa connect panniyachu 🚀

// Test Route
app.get('/', (req, res) => {
  res.send('AI StudyBuddy Backend is running successfully!');
});

// Database Connection & Server Start
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err.message);
  });