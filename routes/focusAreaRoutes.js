const express = require('express');
const focusAreaController = require('../controllers/focusAreaController');

const router = express.Router();

router.post('/', focusAreaController.createFocusArea);
router.get('/', focusAreaController.getFocusAreas);
router.get('/:id', focusAreaController.getFocusAreaById);
router.put('/:id', focusAreaController.updateFocusArea);
router.delete('/:id', focusAreaController.deleteFocusArea);

module.exports = router;
