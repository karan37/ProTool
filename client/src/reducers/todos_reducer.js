import {
    GET_GOAL_RESPONSE,
    UPDATE_TODO_RESPONSE,
    ADD_TODO_RESPONSE,
    DELETE_TODO_RESPONSE
} from '../actions/types';

// Possible collision of todoIds of different tasks
// Solve by concatting todoId-taskId
const initState = {
    byId: {}, // Possible collision of todoIds of different tasks
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
                allIds: state.allIds
            }
        case DELETE_TODO_RESPONSE:
            const { taskId, _id: todoIdToDelete} = action // Possible collision of todoIds of different tasks
            const {[todoIdToDelete]: deletedItem, ...restOfTodos} = state.byId
            return {
                byId: restOfTodos,
                allIds: state.allIds.filter(id => id !== todoIdToDelete)
            }
        default:
            return state
    }
}