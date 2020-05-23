import { combineReducers } from 'redux';
import HashmapReducer from './hashmapReducer';
import UserReducer from './userReducer';

const rootReducer = combineReducers({
  hashmap: HashmapReducer,
  user: UserReducer,
});

export default rootReducer;
