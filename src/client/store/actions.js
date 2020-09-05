export const types = {
  INITIAL_LOADING_COMPLETE: 'INITIAL_LOADING_COMPLETE',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  LOGIN_FAIL: 'LOGIN_FAIL',
  PLAY_AS_GUEST: 'PLAY_AS_GUEST',
  NEW_GAME: 'NEW_GAME'
}

const changeInitialLoading=()=>({
  type: types.INITIAL_LOADING_COMPLETE,
})

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

const playAsGuest = (name) =>({
  type: types.PLAY_AS_GUEST,
  payload: name
})

const newGame = (rounds)=>({
  type: types.NEW_GAME,
  payload: rounds
})

export {
  changeInitialLoading,
  login,
  logout,
  loginFail,
  playAsGuest,
  newGame
}