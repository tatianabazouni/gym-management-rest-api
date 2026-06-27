const express = require('express');
const workoutPlanController = require('../controllers/workoutPlanController');

const router = express.Router();

router.post('/', workoutPlanController.createWorkoutPlan);
router.get('/', workoutPlanController.getWorkoutPlans);
router.get('/:id', workoutPlanController.getWorkoutPlanById);
router.put('/:id', workoutPlanController.updateWorkoutPlan);
router.delete('/:id', workoutPlanController.deleteWorkoutPlan);

module.exports = router;
