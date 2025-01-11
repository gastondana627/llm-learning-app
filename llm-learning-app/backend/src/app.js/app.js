const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
const spaceRoutes = require('./routes/spaceRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const activityRoutes = require('./routes/activityRoutes');
const metricRoutes = require('./routes/metricRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/spaces', spaceRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/metrics', metricRoutes)
module.exports = app;