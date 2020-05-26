import { combineReducers } from 'redux';

import auth from './auth_reducer';
import user from './user_reducer';
import goal from './goal_reducer';
// import tasks from './tasks_reducer';
import todos from './todos_reducer';

const rootReducer = combineReducers({
  auth,
  user,
  goal,
  // tasks,
  todos,
});

export default rootReducer;
