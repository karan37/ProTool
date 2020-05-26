import {
    GET_GOAL_RESPONSE,
    UPDATE_TODO_RESPONSE,
    ADD_TODO_RESPONSE
} from '../actions/types';

const initState = {
    byId: {},
    allIds: []
}

export default function (state = initState, action) {
    switch (action.type) {
        case GET_GOAL_RESPONSE:
            const { goal: { tasks = [] } = {} } = action
            return tasks.reduce((todosOfTasks, task) => {
                const { _id: taskId, todos } = task
                return {
                    byId: {
                        ...todosOfTasks.byId,
                        ...todos.reduce((todosObj, todo) => {
                            return {
                                ...todosObj,
                                [todo._id]: {...todo, taskId}
                            }
                        }, {})
                    },
                    allIds:[
                        ...todosOfTasks.allIds,
                        ...todos.map(todo => todo._id)
                    ]
                }
            },initState)
        case ADD_TODO_RESPONSE:
            const { todoFields } = action
            const { _id } = todoFields
            return {
                byId: {
                    ...state.byId,
                    [_id]: todoFields
                },
                allIds: [...state.allIds, _id]
            }
        case UPDATE_TODO_RESPONSE:
            const { todoFields: updatedTodoFields } = action
            const { _id: todoId } = updatedTodoFields
            const { [todoId]: todoItem = {} } = state.byId
            return {
                byId: {
                    ...state.byId,
                    [todoId]: {
                        ...todoItem,
                        ...updatedTodoFields
                    }
                },
                allIds: [...state.allIds, todoId]
            }
        default:
            return state
    }
}