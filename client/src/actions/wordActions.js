import axios from 'axios';
import { GET_ERRORS, GET_WORDS_BY_USER, ADD_WORD } from './types';

export const addWord = (wordData, history) => dispatch => {
  axios
    .post('/api/words', wordData)
    .then(res => {
      dispatch({
        type: ADD_WORD,
        payload: res.data
      });
      history.push('/dashboard');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getWordsByUser = () => dispatch => {
  axios
    .get('/api/words')
    .then(res =>
      dispatch({
        type: GET_WORDS_BY_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_WORDS_BY_USER,
        payload: null
      })
    );
};
