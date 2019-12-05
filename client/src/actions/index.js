import axios from 'axios';

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

const request = axios;
export { request };