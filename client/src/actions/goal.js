import axios from 'axios';

import { 
    GET_GOAL_REQUEST,
    GET_GOAL_RESPONSE,
} from './types';

export const getGoal = () => {
    return async (dispatch) => {
        dispatch({ type: GET_GOAL_REQUEST })
        let response
        try {
            response = await axios.get(`/goal`)
            const { goal } = response.data
            dispatch({ type: GET_GOAL_RESPONSE, goal })
        } catch (e) {
            console.log(e)
            dispatch({ type: GET_GOAL_RESPONSE, goal: null })
        }
    }
}