const mongoose = require('mongoose');
const Trainer = require('../models/Trainer');
const WorkoutPlan = require('../models/WorkoutPlan');
const FocusArea = require('../models/FocusArea');

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

const handleMongooseError = (error, res) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({ message: error.message });
  }

  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid workout plan ID format.' });
  }

  return res.status(500).json({ message: 'Server error.', error: error.message });
};

const validateRelationships = async (trainerId, focusAreas = []) => {
  if (!isValidObjectId(trainerId)) {
    return 'Invalid trainer ID format.';
  }

  const trainerExists = await Trainer.exists({ _id: trainerId });
  if (!trainerExists) {
    return 'Referenced trainer does not exist.';
  }

  if (!Array.isArray(focusAreas)) {
    return 'Focus areas must be an array of focus area IDs.';
  }

  for (const focusAreaId of focusAreas) {
    if (!isValidObjectId(focusAreaId)) {
      return `Invalid focus area ID format: ${focusAreaId}`;
    }
  }

  const focusAreaCount = await FocusArea.countDocuments({ _id: { $in: focusAreas } });
  if (focusAreaCount !== focusAreas.length) {
    return 'One or more referenced focus areas do not exist.';
  }

  return null;
};

/* =========================
   CREATE WORKOUT PLAN
========================= */
exports.createWorkoutPlan = async (req, res) => {
  try {
    const { trainer, focusAreas = [] } = req.body;

    const relationshipError = await validateRelationships(trainer, focusAreas);
    if (relationshipError) {
      return res.status(400).json({ message: relationshipError });
    }

    const workoutPlan = await WorkoutPlan.create(req.body);

    // 🔥 Sync reverse relation (FocusArea -> WorkoutPlan)
    if (focusAreas.length > 0) {
      await FocusArea.updateMany(
        { _id: { $in: focusAreas } },
        { $addToSet: { workoutPlans: workoutPlan._id } }
      );
    }

    const populatedWorkoutPlan = await WorkoutPlan.findById(workoutPlan._id)
      .populate('trainer', 'name email specialty')
      .populate('focusAreas', 'name description');

    return res.status(201).json(populatedWorkoutPlan);
  } catch (error) {
    return handleMongooseError(error, res);
  }
};

/* =========================
   GET ALL WORKOUT PLANS
========================= */
exports.getWorkoutPlans = async (_req, res) => {
  try {
    const workoutPlans = await WorkoutPlan.find()
      .populate('trainer', 'name email specialty')
      .populate('focusAreas', 'name description')
      .sort({ createdAt: -1 });

    return res.status(200).json(workoutPlans);
  } catch (error) {
    return res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

/* =========================
   GET WORKOUT PLAN BY ID
========================= */
exports.getWorkoutPlanById = async (req, res) => {
  try {
    const workoutPlan = await WorkoutPlan.findById(req.params.id)
      .populate('trainer', 'name email specialty')
      .populate('focusAreas', 'name description');

    if (!workoutPlan) {
      return res.status(404).json({ message: 'Workout plan not found.' });
    }

    return res.status(200).json(workoutPlan);
  } catch (error) {
    return handleMongooseError(error, res);
  }
};

/* =========================
   UPDATE WORKOUT PLAN
========================= */
exports.updateWorkoutPlan = async (req, res) => {
  try {
    const { trainer, focusAreas = [] } = req.body;

    const relationshipError = await validateRelationships(trainer, focusAreas);
    if (relationshipError) {
      return res.status(400).json({ message: relationshipError });
    }

    const existingPlan = await WorkoutPlan.findById(req.params.id);
    if (!existingPlan) {
      return res.status(404).json({ message: 'Workout plan not found.' });
    }

    // 🔥 Remove old relations from FocusArea
    await FocusArea.updateMany(
      { _id: { $in: existingPlan.focusAreas } },
      { $pull: { workoutPlans: existingPlan._id } }
    );

    // 🔥 Update WorkoutPlan
    const workoutPlan = await WorkoutPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    // 🔥 Add new relations
    if (focusAreas.length > 0) {
      await FocusArea.updateMany(
        { _id: { $in: focusAreas } },
        { $addToSet: { workoutPlans: workoutPlan._id } }
      );
    }

    const populatedWorkoutPlan = await WorkoutPlan.findById(workoutPlan._id)
      .populate('trainer', 'name email specialty')
      .populate('focusAreas', 'name description');

    return res.status(200).json(populatedWorkoutPlan);
  } catch (error) {
    return handleMongooseError(error, res);
  }
};

/* =========================
   DELETE WORKOUT PLAN
========================= */
exports.deleteWorkoutPlan = async (req, res) => {
  try {
    const workoutPlan = await WorkoutPlan.findByIdAndDelete(req.params.id);

    if (!workoutPlan) {
      return res.status(404).json({ message: 'Workout plan not found.' });
    }

    // 🔥 Remove reference from FocusAreas
    await FocusArea.updateMany(
      { workoutPlans: req.params.id },
      { $pull: { workoutPlans: req.params.id } }
    );

    return res.status(200).json({ message: 'Workout plan deleted successfully.' });
  } catch (error) {
    return handleMongooseError(error, res);
  }
};