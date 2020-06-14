import GoalModel from './model';

const GoalController = {
    getGoalsOfUser: async (req, res, next) => {
        const userId = req.user._id
        let goals
        try {
            goals = await GoalModel.find({
                user: userId
            }, {
                title: 1,
            })
        } catch (e) { next(e) }
        res.json({ goals })
    },
    getGoal: async (req, res, next) => {
        const userId = req.user._id
        const goalId = req.query.goalId

        let goal
        try {
            goal = await GoalModel.findOne({
                user: userId,
                ...(goalId ? { _id: goalId } : {})
            }, {
                title: 1,
                "tasks._id": 1,
                "tasks.title": 1,
                "tasks.todos._id": 1,
                "tasks.todos.text": 1,
                "tasks.todos.estimate": 1
            })
        } catch (e) { next(e) }
        res.json({ goal })
    },
    addGoal: async (req, res, next) => {
        if (!req.body.title) return res.json({ err: "No Goal title specified" })
        const user = req.user._id
        let newGoal
        try {
            const goal = new GoalModel({
                tasks: [],
                createdOn: new Date(),
                completedOn: null,
                title: "",
                user,
                ...req.body
            })
            newGoal = await goal.save()
        } catch (e) { next(e) }

        res.json({
            addGoal: Boolean(newGoal),
        })
    },
    updateGoal: async (req, res, next) => {
        const { _id, ...goalFields } = req.body
        let result
        try {
            result = await GoalModel.update({ _id }, { $set: goalFields })
        } catch (e) { next(e) }
        res.json({
            updateGoal: Boolean(result && result.nModified && result.nModified > 0)
        })
    },
    deleteGoal: async (req, res, next) => {
        const { _id } = req.body
        let result
        try {
            result = await GoalModel.deleteOne({ _id })
        } catch (e) { next(e) }
        res.json({
            deleteGoal: Boolean(result && result.deletedCount && result.deletedCount === 1)
        })
    }
}

export default GoalController
