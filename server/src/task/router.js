import TaskController from './controller';

const router = require('express').Router();

router.get('/get', TaskController.getTask)
router.post('/add', TaskController.addTask)
router.put('/update', TaskController.updateTask)
router.delete('/delete', TaskController.deleteTask)


export default router;