/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  getName,
} from '../actions';

export const getNameThunk = () => (dispatch) => axios
  .get('/session/name')
  .then((res) => {
    dispatch(getName(res.data));
  })
  .catch((e) => {
    console.log(e);
  });
