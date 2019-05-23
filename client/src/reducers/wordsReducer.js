import {
  GET_WORDS_BY_USER,
  ADD_WORD,
  UPDATE_WORD,
  GET_WORD_BY_ID
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
        words: action.payload,
        loading: false
      };
    case GET_WORD_BY_ID:
      return {
        ...state,
        word: action.payload
      };
    case UPDATE_WORD:
      return {
        ...state,
        words: [action.payload, ...state.words]
      };
    default:
      return state;
  }
}
