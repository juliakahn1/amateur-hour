import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session';
// import { jobsErrorsReducer } from './jobs';

export default combineReducers({
  session: sessionErrorsReducer,
  // jobs: jobsErrorsReducer
});
