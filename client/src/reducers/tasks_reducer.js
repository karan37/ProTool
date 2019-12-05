import {
    GET_GOAL_REQUEST,
    GET_GOAL_RESPONSE,
    UPDATE_TASK_RESPONSE,
    UPDATE_TASK_REQUEST
} from '../actions/types';

const taskFields = {
    fetching: false,
    title: "",
}

const taskReducer = (state={}, action) => {
    switch (action.type) {
        case UPDATE_TASK_REQUEST:
            return {
                ...state,
                fetching: true
            }
        case UPDATE_TASK_RESPONSE:
            const { taskFields, success } = action
            if(success){
                return {
                    ...state,
                    ...taskFields,
                    fetching: false,
                }
            } else {
                return {
                    ...state,
                    fetching: false
                }
            }
        default:
            return state
    }
}

export default function(state=[], action) {
    switch (action.type) {
        case GET_GOAL_REQUEST:
            return { ...initState, fetching: true }
        case GET_GOAL_RESPONSE:
            const { goal: { tasks = [] } = {} } = action
            return tasks
        case UPDATE_TASK_REQUEST:
        case UPDATE_TASK_RESPONSE:
            const { taskFields } = action
            const { _id } = taskFields
            return state.map(task => {
                if(_id === task._id){
                    return taskReducer(task, action)
                } else {
                    return task
                }
            })
        default:
            return state
    }
}