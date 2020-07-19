import {
    GET_GOAL_REQUEST,
    GET_GOAL_RESPONSE,
    UPDATE_GOAL_RESPONSE,
    UPDATE_TASK_REQUEST,
    UPDATE_TASK_RESPONSE,
    ADD_TASK_REQUEST,
    ADD_TASK_RESPONSE,
    DELETE_TASK_RESPONSE,
    CLEAR_GOAL
} from '../actions/types';
import tasksReducer from './tasks_reducer'

const initState = {
    fetching: false,
    title: "",
}

export default function (state = initState, action) {
    const { tasks: stateTasks = [] } = state
    switch (action.type) {
        case CLEAR_GOAL:
            return initState
        case GET_GOAL_REQUEST:
            return { ...state, fetching: true }
        case GET_GOAL_RESPONSE:
            const { goal } = action
            const { tasks = [] } = goal || {}
            return {
                ...state,
                fetching: false,
                ...goal,
                tasks: tasksReducer(tasks, action)
            }
        case UPDATE_GOAL_RESPONSE:
            const { goalFields, success } = action
            if (success) {
                return {
                    ...state,
                    fetching: false,
                    ...goalFields
                }
            } else {
                return {
                    ...state,
                    fetching: false,
                }
            }
        case UPDATE_TASK_REQUEST:
        case UPDATE_TASK_RESPONSE:
            return {
                ...state,
                tasks: tasksReducer(stateTasks, action)
            }
        case ADD_TASK_RESPONSE:
            const { taskFields } = action
            return {
                ...state,
                tasks: [...stateTasks, taskFields]
            }
        case DELETE_TASK_RESPONSE:
            const { _id, success: deleteSuccess } = action
            if (deleteSuccess) {
                return {
                    ...state,
                    tasks: stateTasks.filter(task => task._id !== _id)            
                }
            }
        default:
            return state
    }
}