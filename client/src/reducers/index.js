import { combineReducers } from 'redux';

import auth from './auth_reducer';
import user from './user_reducer';
import goal from './goal_reducer';

const rootReducer = combineReducers({
  auth,
  user,
  goal
});

export default rootReducer;
