import mongoose from 'mongoose';

import GoalModel from '../goal/model';

const TodoController = {
    getTodo: async (req, res, next) => {
        console.log({ req: "getTodo", ids: req.body })
        const { goalId, taskId, _id } = req.body
        let goal
        try {
            goal = await GoalModel.findOne({
                _id: goalId,
                "tasks._id": taskId,
                "tasks.todos._id": _id
            }, {
                _id: 1,
                "tasks.$.todos.$": 1
            })
        } catch (e) { next(e) }
        res.json({ todo: goal.tasks[0].todos[0] })
    },
    addTodo: async (req, res, next) => {
        console.log({ req: "addTodo", todo: req.body })
        const { goalId, taskId, ...todoFields } = req.body
        const _id = mongoose.Types.ObjectId()
        const newTodo = {
            _id,
            createdOn: new Date(),
            completedOn: null,
            text: "",
            estimate: 0,
            ...todoFields
        }
        let result
        try {
            result = await GoalModel.updateOne({
                _id: goalId,
                "tasks._id": taskId
            }, {
                $push: { "tasks.$.todos": newTodo }
            })
        } catch (e) { next(e) }
        res.json({
            addTodo: Boolean(result && result.nModified && result.nModified === 1),
            _id
        })
    },
    updateTodo: async (req, res, next) => {
        console.log({ req: "updateTodo", todoFields: req.body })
        const { goalId, taskId, _id, ...todoFields } = req.body
        let result
        try {
            result = await mongoose.connection.db.command({
                update: GoalModel.collection.name,
                updates: [
                    {
                        q: { 
                            '_id': mongoose.Types.ObjectId(goalId),
                            'tasks._id': mongoose.Types.ObjectId(taskId),
                            'tasks.todos._id': mongoose.Types.ObjectId(_id)
                        },
                        u: {
                            $set: Object.keys(todoFields).reduce((acc, todoField) => ({
                                [`tasks.$[task].todos.$[todo].${todoField}`]: todoFields[todoField],
                                ...acc
                            }), {}),
                        },
                        arrayFilters: [
                            { 'task._id': mongoose.Types.ObjectId(taskId) },
                            { 'todo._id': mongoose.Types.ObjectId(_id) }
                        ],
                    },
                ],
            })
        } catch (e) { next(e) }
        res.json({
            updateTodo: Boolean(result && result.nModified && result.nModified === 1)
        })
    },
    deleteTodo: async (req, res, next) => {
        console.log({ req: "deleteTodo", ids: req.body })
        const { goalId, taskId, _id } = req.body
        let result
        try {
            result = await GoalModel.updateOne({
                _id: goalId,
                "tasks._id": taskId,
                "tasks.todos._id": _id
            }, {
                $pull: { "tasks.$.todos": { _id } }
            })
        } catch (e) { next(e) }
        res.json({
            deleteTodo: Boolean(result && result.nModified && result.nModified === 1)
        })
    }
}

export default TodoController
