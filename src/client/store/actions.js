export const types = {
  INITIAL_LOADING_COMPLETE: 'INITIAL_LOADING_COMPLETE',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  LOGIN_FAIL: 'LOGIN_FAIL',
  PLAY_AS_GUEST: 'PLAY_AS_GUEST',
  NEW_GAME: 'NEW_GAME',
  GET_CURRENT_GAME: 'GET_CURRENT_GAME',
  JOIN_GAME: 'JOIN_GAME',
  UPDATE_INPUT: 'UPDATE_INPUT',
  CLEAR_INPUT: 'CLEAR_INPUT',
  ADD_MESSAGE: 'ADD_MESSAGE',
  ADD_PLAYER: 'ADD_PLAYER',
  RM_PLAYER: 'RM_PLAYER',
  UPDATE_PLAYERS: 'UPDATE_PLAYERS',
  GET_PROMPT: 'GET_PROMPT',
  UPDATE_NAME: 'UPDATE_NAME',
  SET_SESSION: 'SET_SESSION',
  SET_POWERUPS: 'SET_POWERUPS',
  MAKE_HOST: 'MAKE_HOST',
  SET_CORRECT: 'SET_CORRECT',
  SET_WRONG: 'SET_WRONG',
  ADD_SCORE: 'ADD_SCORE',
  START_GAME: 'START_GAME',
  UPDATE_GAME: 'UPDATE_GAME',
  UPDATE_CODE: 'UPDATE_CODE',
  UPDATE_HOST: 'UPDATE_HOST',
  UPDATE_ALIAS: 'UPDATE_ALIAS',
  SET_ROUND_TIMES: 'SET_ROUND_TIMES',
  SET_ROUND_OVER: 'SET_ROUND_OVER',
  LEAVE_GAME: 'LEAVE_GAME',
  NEW_ROUND: 'NEW_ROUND',
  SET_GAME_SCORES: 'SET_GAME_SCORES',
  SUFFER_POWER_UP: 'SUFFER_POWER_UP',
};

const addPlayer = (player) => ({
  type: types.ADD_PLAYER,
  player,
});

const rmPlayer = (player) => ({
  type: types.RM_PLAYER,
  player,
});

const addMessage = (message) => ({
  type: types.ADD_MESSAGE,
  message,
});

const updateInput = (name, value) => ({
  type: types.UPDATE_INPUT,
  name,
  value,
});

const changeInitialLoading = () => ({
  type: types.INITIAL_LOADING_COMPLETE,
});

const login = (email, role) => ({
  type: types.LOGIN,
  email,
  role,
});

const logout = () => ({
  type: types.LOGOUT,
});

const loginFail = (message) => ({
  type: types.LOGIN_FAIL,
  message,
});

const playAsGuest = (name) => ({
  type: types.PLAY_AS_GUEST,
  payload: name,
});

const newGame = (game) => ({
  type: types.NEW_GAME,
  payload: game,
});

const getCurrentGame = ({ game, hostStatus, players }) => ({
  type: types.GET_CURRENT_GAME,
  payload: game,
  hostStatus,
  players,
});

const joinGame = (res) => ({
  type: types.JOIN_GAME,
  payload: res,
});

const getPrompt = (prompt) => ({
  type: types.GET_PROMPT,
  payload: prompt,
});

const setSession = (session) => ({
  type: types.SET_SESSION,
  session,
});

const setPowerups = (powerups) => ({
  type: types.SET_POWERUPS,
  payload: powerups,
});

const updateName = (name) => ({
  type: types.UPDATE_NAME,
  payload: name,
});

const setCorrectAnswer = () => ({
  type: types.SET_CORRECT,
});

const setWrongAnswer = () => ({
  type: types.SET_WRONG,
});

const addScoreAction = (score) => ({
  type: types.ADD_SCORE,
  payload: score,
});

const setGameTimes = (roundStartUnix, roundEnd, roundEndUnix) => ({
  type: types.SET_ROUND_TIMES,
  payload: { start: roundStartUnix, end: roundEnd, endUnix: roundEndUnix },
});

const startGame = () => ({
  type: types.START_GAME,
});

const updateGame = (game) => ({
  type: types.UPDATE_GAME,
  payload: game,
});

const updateCode = (code) => ({
  type: types.UPDATE_CODE,
  code,
});

const roundOver = (bool) => ({
  type: types.SET_ROUND_OVER,
  payload: bool,
});

const leaveGame = (session) => ({
  type: types.LEAVE_GAME,
  payload: session,
});

const newRound = (game) => ({
  type: types.NEW_ROUND,
  payload: game,
});

const updateHostStatus = (status) => ({
  type: types.UPDATE_HOST,
  payload: status,
});

const setGameScores = (players) => ({
  type: types.SET_GAME_SCORES,
  payload: players,
});

const sufferPowerUp = (powerUpName) => ({
  type: types.SUFFER_POWER_UP,
  payload: powerUpName,
});

export {
  changeInitialLoading,
  login,
  logout,
  loginFail,
  playAsGuest,
  newGame,
  joinGame,
  getCurrentGame,
  getPrompt,
  updateInput,
  addMessage,
  addPlayer,
  rmPlayer,
  updateName,
  setSession,
  setPowerups,
  setCorrectAnswer,
  setWrongAnswer,
  addScoreAction,
  startGame,
  updateGame,
  updateCode,
  setGameTimes,
  roundOver,
  leaveGame,
  newRound,
  updateHostStatus,
  setGameScores,
  sufferPowerUp,
};
