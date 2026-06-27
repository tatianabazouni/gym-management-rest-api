const mongoose = require('mongoose');

const focusAreaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Focus area name is required.'],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Focus area description is required.'],
      trim: true,
    },

    workoutPlans: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkoutPlan',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('FocusArea', focusAreaSchema);