import {
    GET_GOAL_REQUEST,
    GET_GOAL_RESPONSE
} from '../actions/types';

const initState = {
    fetching: false,
    title: "",
}

export default function(state=initState, action) {
    switch (action.type) {
        case GET_GOAL_REQUEST:
            return { ...initState, fetching: true }
        case GET_GOAL_RESPONSE:
            const { goal } = action
            return { 
                ...initState, 
                fetching: false ,
                ...goal
            }
        default:
            return state
    }
}