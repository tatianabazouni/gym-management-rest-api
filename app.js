const express = require('express');
const cors = require('cors');

const trainerRoutes = require('./routes/trainerRoutes');
const workoutPlanRoutes = require('./routes/workoutPlanRoutes');
const focusAreaRoutes = require('./routes/focusAreaRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();

app.use(cors()); //allow frontend communication
app.use(express.json()); //

app.get('/', (_req, res) => { // API root endpoint
  res.status(200).json({
    message: 'Gym Management System API is running.',
    endpoints: {
      trainers: '/api/trainers',
      workoutPlans: '/api/workout-plans',
      focusAreas: '/api/focus-areas',
      feedback: '/api/feedback',
    },
  });
});


app.use('/api/trainers', trainerRoutes);
app.use('/api/workout-plans', workoutPlanRoutes);
app.use('/api/focus-areas', focusAreaRoutes);
app.use('/api/feedback', feedbackRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: 'Unexpected server error.', error: error.message });
});

module.exports = app;
