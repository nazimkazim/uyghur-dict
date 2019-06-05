import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import wordsReducer from './wordsReducer';
import usersReducer from './usersReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  words: wordsReducer,
  users: usersReducer
});
