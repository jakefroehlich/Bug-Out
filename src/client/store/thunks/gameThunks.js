/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { playAsGuest, newGame } from '../actions'

export const playAsGuestThunk = (name) => (dispatch) => {
  return axios
    .put('/user/guest-session', {name})
    .then(() => {
      dispatch(playAsGuest(name));
    })
    .catch((e) => {
      console.log(e);
    });
};

export const createGameThunk = (rounds) => (dispatch) => {
  console.log(rounds)
  return axios
    .post('/game/gameSession', {rounds})
    .then(() => {
      dispatch(newGame(rounds));
    })
    .catch((e) => {
      console.log(e);
    });
};
