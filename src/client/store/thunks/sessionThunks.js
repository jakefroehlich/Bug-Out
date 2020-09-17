/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  getName, updateName, makeHost,
} from '../actions';

export const getNameThunk = () => (dispatch) => axios
  .get('/session/name')
  .then((res) => {
    dispatch(getName(res.data));
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
