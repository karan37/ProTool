import GoalModel from './model';

const GoalController = {
    getGoal: async (req, res, next) => {
        console.log({ req: "getGoal", goalId: req.query._id })
        const goalId = req.query._id
        try {
            goal = await GoalModel.findOne({ _id: goalId })
        } catch (e) { next(e) }
        res.json({ goal })
    },
    addGoal: async (req, res, next) => {
        console.log({ req: "addGoal", goal: req.body })
        if (!req.body.title) return res.json({err: "No Goal title specified"})
        const goal = new GoalModel({
            tasks: [],
            createdOn: new Date(),
            completedOn: null,
            title: "",
            ...req.body
        })
        let newGoal
        try {
            newGoal = await goal.save()
        } catch (e) { next(e) }

        res.json({
            addGoal: Boolean(newGoal),
        })
    },
    updateGoal: async (req, res, next) => {
        console.log({ req: "updateGoal", goal: req.body })
        const { _id, ...goalFields } = req.body
        let result
        try {
            result = await GoalModel.update({ _id }, { $set: goalFields })
        } catch (e) { next(e) }
        res.json({
            updateGoal: Boolean(result && result.nModified && result.nModified > 0)
        })
    }
}

export default GoalController
