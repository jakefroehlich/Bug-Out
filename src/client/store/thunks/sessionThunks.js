/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  setSession, updateName, updateHostStatus, leaveGame, resetScore,
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
    dispatch(updateHostStatus(res.data));
  })
  .catch((e) => {
    console.log(e);
  });

export const removeHostThunk = () => (dispatch) => axios
  .post('/session/removeHost')
  .then((res) => {
    dispatch(updateHostStatus(res.data));
  })
  .catch((e) => {
    console.log(e);
  });

export const leaveGameThunk = () => (dispatch) => axios
  .put('/session/leaveGame')
  .then((res) => {
    dispatch(leaveGame(res.data));
  })
  .catch((e) => {
    console.log('error leaving game');
    console.log(e);
  });

export const resetScoreThunk = () => (dispatch) => axios
  .put('/session/reset-score')
  .then((res) => {
    dispatch(resetScore());
  })
  .catch((e) => {
    console.log(e);
  });
