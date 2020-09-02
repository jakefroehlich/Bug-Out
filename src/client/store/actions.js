export const types = {
  INITIAL_LOADING_COMPLETE: 'INITIAL_LOADING_COMPLETE',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  LOGIN_FAIL: 'LOGIN_FAIL',
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

export {
  changeInitialLoading,
  login,
  logout,
  loginFail,
}