import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Nav from './Nav';
import Leaderboard from './leaderboard';
import { setSessionThunk, removePlayerThunk } from '../store/thunks';

const GameOver = ({ history, setSession, game, removePlayer, }) => {
  useEffect(() => {
    setSession();
    removePlayer(game.id);
  }, []);

  const handleClick = () => {
    history.push('/console');
  };

  return (
    <div
      className="gameoverwrapper"
    >
      <Nav />
      <div
        className="gameover"
      >
        <span>Game Over</span>
        <Leaderboard />
      </div>
      <button
        className="button"
        type="button"
        onClick={handleClick}
      >
        Home
      </button>
    </div>
  );
};

const mapStateToProps = ({
  game, user, input, session,
}) => ({
  game, user, input, session,
});

const mapDispatchToProps = (dispatch) => ({
  setSession: () => dispatch(setSessionThunk()),
  removePlayer: (code) => dispatch(removePlayerThunk(code))
});

export default connect(mapStateToProps, mapDispatchToProps)(GameOver);
