const FocusArea = require('../models/FocusArea');
const WorkoutPlan = require('../models/WorkoutPlan');

const handleMongooseError = (error, res) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({ message: error.message });
  }

  if (error.code === 11000) {
    return res.status(400).json({ message: 'Focus area name must be unique.' });
  }

  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid focus area ID format.' });
  }

  return res.status(500).json({ message: 'Server error.', error: error.message });
};

exports.createFocusArea = async (req, res) => {
  try {
    const focusArea = await FocusArea.create(req.body);
    return res.status(201).json(focusArea);
  } catch (error) {
    return handleMongooseError(error, res);
  }
};

exports.getFocusAreas = async (_req, res) => {
  try {
    const focusAreas = await FocusArea.find().sort({ createdAt: -1 });
    return res.status(200).json(focusAreas);
  } catch (error) {
    return res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.getFocusAreaById = async (req, res) => {
  try {
    const focusArea = await FocusArea.findById(req.params.id);

    if (!focusArea) {
      return res.status(404).json({ message: 'Focus area not found.' });
    }

    return res.status(200).json(focusArea);
  } catch (error) {
    return handleMongooseError(error, res);
  }
};

exports.updateFocusArea = async (req, res) => {
  try {
    const focusArea = await FocusArea.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!focusArea) {
      return res.status(404).json({ message: 'Focus area not found.' });
    }

    return res.status(200).json(focusArea);
  } catch (error) {
    return handleMongooseError(error, res);
  }
};

exports.deleteFocusArea = async (req, res) => {
  try {
    const focusArea = await FocusArea.findByIdAndDelete(req.params.id);

    if (!focusArea) {
      return res.status(404).json({ message: 'Focus area not found.' });
    }

    await WorkoutPlan.updateMany(
      { focusAreas: req.params.id },
      { $pull: { focusAreas: req.params.id } }
    );

    return res.status(200).json({ message: 'Focus area deleted successfully.' });
  } catch (error) {
    return handleMongooseError(error, res);
  }
};
