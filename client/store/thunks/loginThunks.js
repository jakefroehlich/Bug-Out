import { login, logout, loginFail } from '../actions';
import axios from 'axios';

export const loginThunk = (email, password) => (dispatch) => {
  return axios
    .post('/api/login', { email, password })
    .then((res) => {
      dispatch(login(email, res.data.role));
    })
    .catch(() => {
      dispatch(loginFail('Incorrect email or password'));
    });
};

export const logoutThunk = () => (dispatch) => {
  return axios
    .get('/api/logout')
    .then(() => {
      dispatch(logout());
    })
    .catch((e) => {
      console.log(e);
    });
};

export const whoami = () => (dispatch) => {
  return axios.get('/api/whoami').then(({ data }) => {
    if (data.loggedIn) {
      dispatch(login(data.email, data.role));
    } else {
      dispatch(logout());
    }
  });
};