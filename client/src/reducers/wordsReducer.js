import {
  GET_WORDS_BY_USER,
  ADD_WORD,
  UPDATE_WORD,
  GET_WORD_BY_ID,
  DELETE_WORD,
  SEARCH_WORD
} from '../actions/types';

const initialState = {
  words: [],
  word: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_WORD:
      return {
        ...state,
        words: [action.payload, ...state.words]
      };
    case GET_WORDS_BY_USER:
      return {
        ...state,
        words: action.payload
      };
    case GET_WORD_BY_ID:
      return {
        ...state,
        word: action.payload
      };
    case UPDATE_WORD:
      return {
        ...state,
        words: action.payload
      };
    case SEARCH_WORD:
      return {
        ...state,
        words: action.payload
      };
    case DELETE_WORD:
      return {
        ...state,
        words: state.words.filter(word => word._id !== action.payload)
      };
    default:
      return state;
  }
}
