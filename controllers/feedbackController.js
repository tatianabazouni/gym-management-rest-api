const Feedback = require('../models/Feedback');

const handleSequelizeError = (error, res) => {
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({
      message: error.errors.map((item) => item.message).join(', '),
    });
  }

  return res.status(500).json({ message: 'Server error.', error: error.message });
};
// Create a new feedback entry
exports.createFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    return res.status(201).json(feedback);
  } catch (error) {
    return handleSequelizeError(error, res);
  }
};
// Get a list of all feedback entries
exports.getFeedbackList = async (_req, res) => {
  try {
    const feedbackList = await Feedback.findAll({ order: [['createdAt', 'DESC']] });
    return res.status(200).json(feedbackList);
  } catch (error) {
    return res.status(500).json({ message: 'Server error.', error: error.message });
  }
};
// Get a specific feedback entry by ID
exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findByPk(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found.' });
    }

    return res.status(200).json(feedback);
  } catch (error) {
    return handleSequelizeError(error, res);
  }
};
//

exports.updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByPk(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found.' });
    }

    await feedback.update(req.body);
    return res.status(200).json(feedback);
  } catch (error) {
    return handleSequelizeError(error, res);
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByPk(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found.' });
    }

    await feedback.destroy();
    return res.status(200).json({ message: 'Feedback deleted successfully.' });
  } catch (error) {
    return handleSequelizeError(error, res);
  }
};
