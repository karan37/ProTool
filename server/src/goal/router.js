import GoalController from './controller';

const router = require('express').Router();

router.get('/', GoalController.getGoal)
router.post('/', GoalController.addGoal)
router.post('/update', GoalController.updateGoal)


export default router;