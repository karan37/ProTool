import GoalModel from '../goal/model';

const TaskController = {
    getTask: async (req, res, next) => {
        console.log({ req: "getTask", ids: req.body })
        const { goalId, _id } = req.body
        let goal
        try {
            goal = await GoalModel.findOne({
                _id: goalId, 
                "tasks._id": _id
            }, {
                _id: 1,
                "tasks.$": 1
            })
        } catch (e) { next(e) }
        res.json({ task: goal.tasks[0] })
    },
    addTask: async (req, res, next) => {
        console.log({ req: "addTask", task: req.body })
        const { goalId, ...taskFields } = req.body
        const newTask = {
            createdOn: new Date(),
            completedOn: null,
            title: "",
            ...taskFields
        }
        let result
        try {
            result = await GoalModel.updateOne({ _id: goalId }, { $push: { tasks: newTask } })
        } catch (e) { next(e) }
        res.json({
            addTask: Boolean(result && result.nModified && result.nModified === 1)
        })
    },
    updateTask: async (req, res, next) => {
        console.log({ req: "updateTask", taskFields: req.body })
        const { goalId, _id, ...taskFields } = req.body
        let result
        try {
            result = await GoalModel.updateOne({
                _id: goalId,
                "tasks._id": _id
            }, {
                $set: Object.keys(taskFields).reduce((acc, taskField) => ({
                    [`tasks.$.${taskField}`]: taskFields[taskField],
                    ...acc
                }), {})
            })
        } catch (e) { next(e) }
        res.json({
            updateTask: Boolean(result && result.nModified && result.nModified === 1)
        })
    },
    deleteTask: async (req, res, next) => {
        console.log({ req: "deleteTask", ids: req.body })
        const { goalId, _id } = req.body
        let result
        try {
            result = await GoalModel.updateOne({
                _id: goalId,
                "tasks._id": _id
            }, {
                $pull: { tasks: { _id } }
            })
        } catch (e) { next(e) }
        res.json({
            updateTask: Boolean(result && result.nModified && result.nModified === 1)
        })
    }
}

export default TaskController
