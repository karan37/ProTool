import {
    GET_GOAL_REQUEST,
    GET_GOAL_RESPONSE,
    UPDATE_TASK_RESPONSE,
    UPDATE_TASK_REQUEST,
    ADD_TODO_REQUEST,
    ADD_TODO_RESPONSE
} from '../actions/types';

const taskFields = {
    fetching: false,
    title: "",
    todos:[]
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
            return { ...state, fetching: true }
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
        // case ADD_TODO_REQUEST:
        // case ADD_TODO_RESPONSE:
        //     const { todoFields } = action
        //     const { taskId } = todoFields
        //     return state.map(task => {
        //         if(taskId === task._id){
        //             return taskReducer(task, action)
        //         } else {
        //             return task
        //         }
        //     })
        default:
            return state
    }
}