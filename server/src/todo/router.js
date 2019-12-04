import TodoController from './controller';

const router = require('express').Router();

router.get('/get', TodoController.getTodo)
router.post('/add', TodoController.addTodo)
router.put('/update', TodoController.updateTodo)
router.delete('/delete', TodoController.deleteTodo)

export default router;