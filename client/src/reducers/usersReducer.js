import {
  GET_LEADERS,
  GET_PUBLIC_PROFILE_BY_ID,
  PROFILE_LOADING
} from '../actions/types';

const initialState = {
  users: null,
  user: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_LEADERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case GET_PUBLIC_PROFILE_BY_ID:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
