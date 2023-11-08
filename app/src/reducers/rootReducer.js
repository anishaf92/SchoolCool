import { combineReducers } from 'redux';
import studentReducer from './studentReducer';
import teacherReducer from './teacherReducer';
import adminReducer from './adminReducer';

const rootReducer = combineReducers({
  student: studentReducer,
  teacher: teacherReducer,
  admin: adminReducer,

  // Add more reducers here if needed
});

export default rootReducer;
