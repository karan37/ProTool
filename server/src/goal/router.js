import GoalController from './controller';

const router = require('express').Router();

router.get('/all', GoalController.getGoalsOfUser)
router.get('/get', GoalController.getGoal)
router.post('/add', GoalController.addGoal)
router.put('/update', GoalController.updateGoal)
router.delete('/delete', GoalController.deleteGoal)


export default router;