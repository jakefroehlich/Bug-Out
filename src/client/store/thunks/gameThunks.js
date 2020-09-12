/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { playAsGuest, newGame, getCurrentGame } from "../actions";

export const playAsGuestThunk = (name) => (dispatch) => {
  return axios
    .put("/user/guest-session", { name })
    .then(() => {
      dispatch(playAsGuest(name));
    })
    .catch((e) => {
      console.log(e);
    });
};

export const createGameThunk = (rounds, difficulty) => (dispatch) => {
  console.log(rounds);
  return axios
    .post("/game/createNew", { rounds, difficulty })
    .then((game) => {
      console.log("game data from createNew is ", game.data);
      dispatch(newGame(game.data));
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getCurrentGameThunk = () => (dispatch) => {
  return axios
    .get("/game/current")
    .then((game) => {
      console.log("game from server is ", game.data);
      dispatch(getCurrentGame(game.data));
    })
    .catch((e) => {
      console.log(e);
    });
};

export const findRandomGame = () => () => {
  return axios
    .get("/game/gameSession")
    .then(({ data }) => {
      const { id } = data;
      axios.put(`/user/session/`, id);
      // dispatch(newGame(rounds));
    })
    .catch((e) => {
      console.log(e);
    });
};
