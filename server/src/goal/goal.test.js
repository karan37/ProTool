import GoalController from "./controller"
import GoalModel from "./model"

const mockSave = jest.fn()
jest.mock("./model")

const _id = "Some Id"
let req = {
    query: {
        _id
    },
    body: {
        title: "goal tit",
        createdOn: new Date()
    }
}
const res = {
    json: jest.fn()
}
const next = jest.fn()

test("Test getGoal", () => {
    const goal = GoalController.getGoal(req, res, next)
    expect(GoalModel.findOne).toHaveBeenCalledWith({_id: req.query._id})
})
test("Test addGoal", () => {
    GoalModel.mockImplementation(() => {
        return {
            save: mockSave,
        }
    })
    const reult = GoalController.addGoal(req,res,next)
    expect(GoalModel).toHaveBeenCalledWith({
        tasks: [],
        createdOn: req.body.createdOn,
        completedOn: null,
        title: req.body.title,
    })
    expect(mockSave).toHaveBeenCalledTimes(1)
})
test("Test updateGoal", () => {
    req.body = {
        _id,
        newField: "fielValue",
        ...req
    }
    const reult = GoalController.updateGoal(req,res,next)
    const { _id, ...goalFields } = req.body
    expect(GoalModel.update).toHaveBeenCalledWith({_id}, {$set: goalFields})
})
