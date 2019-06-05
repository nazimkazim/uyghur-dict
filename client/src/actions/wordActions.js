import axios from 'axios';
import {
  GET_ERRORS,
  GET_WORDS_BY_USER,
  ADD_WORD,
  UPDATE_WORD,
  GET_WORD_BY_ID,
  DELETE_WORD,
  SEARCH_WORD
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

export const searchWord = () => dispatch => {
  axios
    .get('/api/words')
    .then(res => {
      dispatch({
        type: SEARCH_WORD,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getWordsByUser = user => dispatch => {
  axios
    .get('/api/words')
    .then(res => {
      let filteredWords = res.data.filter(word => word.user === user.user.id);
      dispatch({
        type: GET_WORDS_BY_USER,
        payload: filteredWords
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
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
        type: GET_ERRORS,
        payload: null
      })
    );
};

export const updateWord = (id, updatedWord, history) => dispatch => {
  axios
    .put(`/api/words/${id}`, updatedWord)
    .then(res => {
      dispatch({
        type: UPDATE_WORD,
        payload: res.data
      });
      history.push('/my-words');
    })
    .catch(err =>
      dispatch({
        type: UPDATE_WORD,
        payload: ''
      })
    );
};

export const deleteWord = id => dispatch => {
  axios
    .delete(`/api/words/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_WORD,
        payload: id
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};
