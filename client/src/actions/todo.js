import axios from 'axios';

import {
    ADD_TODO_REQUEST,
    ADD_TODO_RESPONSE,
    UPDATE_TODO_REQUEST,
    UPDATE_TODO_RESPONSE,
    DELETE_TODO_REQUEST,
    DELETE_TODO_RESPONSE
} from './types';

export const upsertTodo = todoFields => {
    return async (dispatch, getState) => {
        let response
        const { goal = {} } = getState()
        const { _id: goalId } = goal
        const { _id, taskId } = todoFields
        if (_id && taskId && goalId) {
            dispatch({ type: UPDATE_TODO_REQUEST, taskFields })
            try {
                response = await axios.put(`/todo/update`, { goalId, taskId, ...todoFields })
                const { updateTodo } = response.data
                dispatch({ type: UPDATE_TODO_RESPONSE, todoFields, success: updateTodo })
            } catch (e) {
                console.log(e)
                dispatch({ type: UPDATE_TODO_RESPONSE, success: null })
            }
        } else if (taskId && goalId) {
            dispatch({ type: ADD_TODO_REQUEST })
            try {
                response = await axios.post(`/todo/add`, { goalId, taskId, ...todoFields })
                const { addTodo, _id } = response.data
                dispatch({ type: ADD_TODO_RESPONSE, todoFields:  { ...todoFields, _id, goalId }, success: addTodo })
            } catch (e) {
                console.log(e)
                dispatch({ type: ADD_TODO_RESPONSE, success: null })
            }
        }
    }
}

export const deleteTodo = (_id, taskId) => {
    return async (dispatch, getState) => {
        let response
        const { goal = {} } = getState()
        const { _id: goalId } = goal
        if (_id && taskId && goalId) {
            dispatch({ type: DELETE_TODO_REQUEST })
            try {
                response = await axios.delete(`/todo/delete`, { data: { goalId, _id, taskId } })
                const { deleteTodo } = response.data
                dispatch({ type: DELETE_TODO_RESPONSE, _id, success: deleteTodo })
            } catch (e) {
                console.log(e)
                dispatch({ type: DELETE_TODO_RESPONSE, success: null })
            }
        }
    }
}