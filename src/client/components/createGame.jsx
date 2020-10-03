/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createGameThunk, makeHostThunk } from '../store/thunks';
// import socket from '../utils/socket';

const CreateGame = ({
  createGame,
  history,
  makeHost,
}) => {
  const [rounds, setRounds] = useState(1);
  const [difficulty, setDifficulty] = useState('easy');

  const handleSubmit = (e) => {
    e.preventDefault();
    createGame(rounds, difficulty, history);
    makeHost();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form"
    >
      <div className="creategame">
        <span>Create Game</span>
        <div className="diff">
          <label>Difficulty : </label>
          <select
            placeholder="Select Difficulty"
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy" defaultValue> Easy </option>
            <option value="medium"> Medium </option>
            <option value="hard"> Hard </option>
          </select>
        </div>
        <div className="rounds">
          <label># of Rounds : </label>
          <select
            placeholder="Select # of Rounds"
            onChange={(e) => setRounds(e.target.value)}
          >
            <option value="1" defaultValue> 1 </option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <button className="button" type="submit">Create</button>
      </div>
    </form>
  );
};

const mapStateToProps = ({
  game, user, input, session, messages,
}) => ({
  game, user, input, session, messages,
});

const mapDispatchToProps = (dispatch) => ({
  createGame: (rounds, difficulty, history) => dispatch(createGameThunk(rounds, difficulty, history)),
  makeHost: () => dispatch(makeHostThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame);
