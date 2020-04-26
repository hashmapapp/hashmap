import { combineReducers } from 'redux';
import HashmapReducer from './hashmapReducer';

const rootReducer = combineReducers({
  hashmap: HashmapReducer,
});

export default rootReducer;
