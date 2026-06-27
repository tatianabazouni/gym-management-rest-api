const express = require('express');
const feedbackController = require('../controllers/feedbackController');

const router = express.Router();

router.post('/', feedbackController.createFeedback); // Create a new feedback entry
router.get('/', feedbackController.getFeedbackList); // Get a list of all feedback entries
router.get('/:id', feedbackController.getFeedbackById); // Get a specific feedback entry by ID
router.put('/:id', feedbackController.updateFeedback);  // Update a specific feedback entry by ID
router.delete('/:id', feedbackController.deleteFeedback); // Delete a specific feedback entry by ID

module.exports = router;
