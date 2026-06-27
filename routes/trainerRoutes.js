const express = require('express');
const trainerController = require('../controllers/trainerController');

const router = express.Router();

router.post('/', trainerController.createTrainer);
router.get('/', trainerController.getTrainers);
router.get('/:id', trainerController.getTrainerById);
router.put('/:id', trainerController.updateTrainer);
router.delete('/:id', trainerController.deleteTrainer);

module.exports = router;
