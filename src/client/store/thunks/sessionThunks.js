/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  setSession, updateName, makeHost,
} from '../actions';

export const setSessionThunk = () => (dispatch) => axios
  .get('/session/current')
  .then((res) => {
    dispatch(setSession(res.data));
  })
  .catch((e) => {
    console.log(e);
  });

export const updateNameThunk = (name) => (dispatch) => axios
  .put('/session/updateName', { name })
  .then((res) => {
    dispatch(updateName(res.data));
  })
  .catch((e) => {
    console.log(e);
  });

export const makeHostThunk = () => (dispatch) => axios
  .post('/session/makeHost')
  .then((res) => {
    dispatch(makeHost(res.data));
  })
  .catch((e) => {
    console.log(e);
  });
