import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { joinGameThunk, removeHostThunk } from '../store/thunks';

const JoinGame = ({ joinGame, history, rmHost }) => {
  const [gameCode, setGameCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    rmHost();
    joinGame(gameCode, history);
  };

  useEffect(() => {
    rmHost();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="form"
    >
      <div className="joingame">
        <span>Join Game</span>
        {/* <div className="codeinput"> */}
        <input
          className="input"
          type="text"
          value={gameCode}
          placeholder="Enter Game Code"
          onChange={(e) => setGameCode(e.target.value)}
        />
        {/* </div> */}
        <button className="button" type="submit">Join</button>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  // getCurrentGame: () => dispatch(getCurrentGameThunk()),
  joinGame: (code, history) => dispatch(joinGameThunk(code, history)),
  rmHost: () => dispatch(removeHostThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame);
