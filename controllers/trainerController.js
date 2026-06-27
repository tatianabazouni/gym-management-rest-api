const Trainer = require('../models/Trainer');
const WorkoutPlan = require('../models/WorkoutPlan');

const handleMongooseError = (error, res) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({ message: error.message });
  }

  if (error.code === 11000) {
    return res.status(400).json({ message: 'Trainer email must be unique.' });
  }

  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid trainer ID format.' });
  }

  return res.status(500).json({ message: 'Server error.', error: error.message });
};

exports.createTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.create(req.body);
    return res.status(201).json(trainer);
  } catch (error) {
    return handleMongooseError(error, res);
  }
};

exports.getTrainers = async (_req, res) => {
  try {
    const trainers = await Trainer.find().sort({ createdAt: -1 });
    return res.status(200).json(trainers);
  } catch (error) {
    return res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);

    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found.' });
    }

    return res.status(200).json(trainer);
  } catch (error) {
    return handleMongooseError(error, res);
  }
};

exports.updateTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found.' });
    }

    return res.status(200).json(trainer);
  } catch (error) {
    return handleMongooseError(error, res);
  }
};

exports.deleteTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);

    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found.' });
    }

    await WorkoutPlan.deleteMany({ trainer: req.params.id });

    return res.status(200).json({ message: 'Trainer deleted successfully.' });
  } catch (error) {
    return handleMongooseError(error, res);
  }
};
