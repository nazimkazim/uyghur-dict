import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import wordsReducer from './wordsReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  words: wordsReducer
});
