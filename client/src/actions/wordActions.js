import axios from 'axios';
import {
  GET_ERRORS,
  GET_WORDS_BY_USER,
  ADD_WORD,
  UPDATE_WORD,
  GET_WORD_BY_ID
} from './types';

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

export const getWordByID = urlID => dispatch => {
  //console.log(urlID);
  axios
    .get('/api/words')
    .then(res => {
      let word = res.data.filter(word => word._id === urlID);
      //console.log(filteredData);
      dispatch({
        type: GET_WORD_BY_ID,
        payload: word
      });
      //console.log(res.data);
    })
    .catch(err =>
      dispatch({
        type: GET_WORD_BY_ID,
        payload: null
      })
    );
};

/* export const updateWord = (newData, id, history) => dispatch => {
  axios
    .get('/api/words/:id', newData)
    .then(res => {
      dispatch({
        type: UPDATE_WORD,
        payload: newData
      });
      history.push('/dashboard');
    })
    .catch(err =>
      dispatch({
        type: UPDATE_WORD,
        payload: null
      })
    );
}; */
