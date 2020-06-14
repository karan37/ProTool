import { GET_USER_GOALS_RESPONSE } from '../actions/types'
const initState = []

export default (state = initState, action) => {
    switch (action.type) {
        case GET_USER_GOALS_RESPONSE:
            const { goals } = action
            return goals
        default:
            return state
    }
}