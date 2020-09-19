/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  getCurrentGame,
  getPrompt,
  setPowerups,
  setCorrectAnswer,
  addScoreAction,
  startGame,
  updateName,
  updateGame,
} from '../actions';

export const updateGameThunk = (rounds, difficulty) => (dispatch) => {
  console.log(rounds);
  return axios
    .post('/game/updateGame', { rounds, difficulty })
    .then((game) => {
      dispatch(updateGame(game.data));
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getCurrentGameThunk = () => (dispatch) => axios
  .get('/game/current')
  .then((res) => {
    // console.log('getcurrentGame response from server is ', res);
    const { game, players } = res.data;
    dispatch(getCurrentGame({ game, players }));
  })
  .catch((e) => {
    console.log(e);
  });

export const findRandomGameThunk = (currentGameId) => (dispatch) => axios
  .post('/game/findRandomGame', { currentGameId })
  .then(({ data }) => {
    dispatch(data);
  })
  .catch((e) => {
    console.log(e);
  });

export const getPromptThunk = (difficulty) => (dispatch) => axios
  .get(`/game/prompt/${difficulty}`)
  .then(({ data }) => {
    dispatch(getPrompt(data));
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

export const updateNameThunk = (name) => (dispatch) => axios
  .put('/session/updateName', { name })
  .then((res) => {
    dispatch(updateName(res.data));
  })
  .catch((e) => {
    console.log(e);
  });

export const setCorrect = () => (dispatch) => {
  dispatch(setCorrectAnswer());
};

export const addScore = (score) => (dispatch) => {
  dispatch(addScoreAction(score));
};

export const startGameThunk = (currentGameId) => (dispatch) => axios
  .put('/game/startGame', { currentGameId })
  .then((res) => {
    console.log('start');
    console.log('response from server on StartGameThunk is ', res);
    dispatch(startGame(res.data));
  })
  .catch((e) => {
    console.log(e);
  });

// export const startGameThunk = (currentGameId) => (dispatch) => {
//   return null;
// }
