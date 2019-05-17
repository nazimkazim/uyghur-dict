import axios from 'axios';
import { GET_ERRORS } from './types';

export const addWord = (wordData, history) => dispatch => {
  axios
    .post('/api/words', wordData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
