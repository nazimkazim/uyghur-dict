import { GET_LEADERS, GET_PUBLIC_PROFILE_BY_ID } from '../actions/types';

const initialState = {
  users: [],
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LEADERS:
      return {
        ...state,
        users: action.payload
      };
    case GET_PUBLIC_PROFILE_BY_ID:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}
