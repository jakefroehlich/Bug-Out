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
  return axios
    .post('/game/gameSession', {rounds})
    .then(({data}) => {
      dispatch(newGame(rounds));
      axios.put('/user/session', {data})
    })
    .catch((e) => {
      console.log(e);
    });
};

export const findRandomGame = () => () => {
  return axios
    .get('/game/gameSession')
      .then(({data}) => {
        const {id} = data
        axios.put(`/user/session/`, id)
        // dispatch(newGame(rounds));
      })
    .catch((e) => {
      console.log(e);
    });
};
