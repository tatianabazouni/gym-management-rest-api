const mongoose = require('mongoose');

const workoutPlanSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Workout plan title is required.'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Workout plan description is required.'],
      trim: true,
    },
    difficultyLevel: {
      type: String,
      required: [true, 'Difficulty level is required.'],
      enum: ['Beginner', 'Intermediate', 'Advanced'],
    },
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trainer',
      required: [true, 'Trainer reference is required.'],
    },
    focusAreas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FocusArea',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('WorkoutPlan', workoutPlanSchema);
