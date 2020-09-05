/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { playAsGuest } from '../actions'

export const playAsGuestThunk = (name) => (dispatch) => {
  console.log(name)
  return axios
    .put('/user/guest-session', {name})
    .then(() => {
      dispatch(playAsGuest(name));
    })
    .catch((e) => {
      console.log(e);
    });
};
