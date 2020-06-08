import axios from 'axios';

import {
    ADD_TASK_REQUEST,
    ADD_TASK_RESPONSE,
    UPDATE_TASK_REQUEST,
    UPDATE_TASK_RESPONSE,
    DELETE_TASK_REQUEST,
    DELETE_TASK_RESPONSE
} from './types';

export const upsertTask = taskFields => {
    return async (dispatch, getState) => {
        let response
        const { goal = {} } = getState()
        const { _id: goalId } = goal
        const { _id } = taskFields
        if (_id) {
            dispatch({ type: UPDATE_TASK_REQUEST, taskFields })
            try {
                response = await axios.put(`/task/update`, { goalId, ...taskFields })
                const { updateTask } = response.data
                dispatch({ type: UPDATE_TASK_RESPONSE, taskFields, success: updateTask })
            } catch (e) {
                console.log(e)
                dispatch({ type: UPDATE_TASK_RESPONSE, success: null })
            }
        } else {
            dispatch({ type: ADD_TASK_REQUEST })
            try {
                response = await axios.post(`/task/add`, { goalId, ...taskFields })
                const { addTask, _id } = response.data
                dispatch({ type: ADD_TASK_RESPONSE, taskFields:  { ...taskFields, _id, goalId }, success: addTask })
            } catch (e) {
                console.log(e)
                dispatch({ type: ADD_TASK_RESPONSE, success: null })
            }
        }
    }
}

export const deleteTask = _id => {
    return async (dispatch, getState) => {
        let response
        const { goal = {} } = getState()
        const { _id: goalId } = goal
        if (_id) {
            dispatch({ type: DELETE_TASK_REQUEST })
            try {
                response = await axios.delete(`/task/delete`, { data: { goalId, _id } })
                const { deleteTask } = response.data
                dispatch({ type: DELETE_TASK_RESPONSE, _id, success: deleteTask })
            } catch (e) {
                console.log(e)
                dispatch({ type: DELETE_TASK_RESPONSE, success: null })
            }
        }
    }
}