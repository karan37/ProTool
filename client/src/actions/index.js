import axios from 'axios';
import { NAVIGATE } from './types'

const ROOT_URL = process.env.API_URI || 'http://localhost:8000';

axios.defaults.baseURL = ROOT_URL;
if (localStorage.getItem('auth_jwt_token')) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_jwt_token');
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// Export action modules
export * from "./user"
export * from "./goal"
export * from "./task"
export * from "./todo"

export const navigate = (location) => {
    return (dispatch, getState) => {
        dispatch({type:NAVIGATE, location})
        window.location = `#${location}`
    }
}

const request = axios;
export { request };