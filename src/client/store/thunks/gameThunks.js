/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  playAsGuest,
  newGame,
  getCurrentGame,
  joinGame,
  setPrompt,
  setPowerups,
} from '../actions';

export const createGameThunk = (rounds, difficulty) => (dispatch) => {
  console.log(rounds);
  return axios
    .post('/game/createNew', { rounds, difficulty })
    .then((game) => {
      console.log('game data from createNew is ', game.data);
      dispatch(newGame(game.data));
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getCurrentGameThunk = () => (dispatch) => axios
  .get('/game/current')
  .then((res) => {
    console.log('getcurrentGame response from server is ', res);
    const { game, players } = res.data;
    dispatch(getCurrentGame({ game, players }));
  })
  .catch((e) => {
    console.log(e);
  });

export const findRandomGameThunk = (currentGameId) => (dispatch) => axios
  .get('/game/gameSession')
  .then(({ data }) => {
    const { id } = data;
    axios.put('/user/session/', id);
    // dispatch(newGame(rounds));
  })
  .catch((e) => {
    console.log(e);
  });

export const getPromptThunk = (difficulty) => (dispatch) => axios
  .get(`/game/prompt/${difficulty}`)
  .then(({ data }) => {
    dispatch(setPrompt(data));
  })
  .catch((e) => {
    console.log(e);
  });

export const getPowerUpsThunk = () => (dispatch) => axios
  .get('/game/powerups')
  .then(({ data }) => {
    dispatch(setPowerups(data));
  })
  .catch((e) => {
    console.log(e);
  });

export const updateNameThunk = (name) => (dispatch) => {
  console.log('updateNameThunk hit');
  return axios
    .put('/session/updateName', { name })
    .then((res) => { })
    .catch((e) => {
      console.log(e);
    });
};