import { GET_LEADERS } from '../actions/types';

const initialState = {
  users: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LEADERS:
      return {
        ...state,
        users: action.payload
      };
    default:
      return state;
  }
}
