import axios from 'axios';

import {
    ADD_GOAL_REQUEST,
    ADD_GOAL_RESPONSE,
    GET_GOAL_REQUEST,
    GET_GOAL_RESPONSE,
    UPDATE_GOAL_REQUEST,
    UPDATE_GOAL_RESPONSE,
    GET_USER_GOALS_REQUEST,
    GET_USER_GOALS_RESPONSE,
    CLEAR_GOAL
} from './types';

export const clearGoal = () => ({
    type: CLEAR_GOAL
})

export const getGoal = goalId => {
    return async dispatch => {
        dispatch({ type: GET_GOAL_REQUEST, goalId })
        let response
        try {
            response = await axios.get(`/goal/get`, { params: { goalId } })
            const { goal } = response.data
            dispatch({ type: GET_GOAL_RESPONSE, goal })
        } catch (e) {
            console.log(e)
            dispatch({ type: GET_GOAL_RESPONSE, goal: null })
        }
    }
}

export const getUserGoals = () => {
    return async dispatch => {
        dispatch({ type: GET_USER_GOALS_REQUEST, })
        let response
        try {
            response = await axios.get(`/goal/all`)
            const { goals } = response.data
            dispatch({ type: GET_USER_GOALS_RESPONSE, goals })
        } catch (e) {
            console.log(e)
            dispatch({ type: GET_USER_GOALS_RESPONSE, goals: null })
        }
    }
}

export const upsertGoal = goalFields => {
    return async (dispatch, getState) => {
        let response
        const { goal: { _id = null } = {} } = getState()
        if (_id) {
            dispatch({ type: UPDATE_GOAL_REQUEST })
            try {
                response = await axios.put(`/goal/update`, { _id, ...goalFields })
                const { updateGoal } = response.data
                dispatch({ type: UPDATE_GOAL_RESPONSE, goalFields, success: updateGoal })
            } catch (e) {
                console.log(e)
                dispatch({ type: UPDATE_GOAL_RESPONSE, success: null })
            }
        } else {
            dispatch({ type: ADD_GOAL_REQUEST })
            try {
                response = await axios.post(`/goal/add`, goalFields)
                const { addGoal, _id } = response.data
                dispatch({ type: ADD_GOAL_RESPONSE, success: addGoal })
                dispatch(getGoal(_id))
                console.log({addGoal: response.data})
            } catch (e) {
                console.log(e)
                dispatch({ type: ADD_GOAL_RESPONSE, success: null })
            }
        }

    }
}