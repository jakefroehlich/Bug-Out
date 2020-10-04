import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Nav from './Nav';
import Leaderboard from './leaderboard';
import { setSessionThunk } from '../store/thunks';

const GameOver = ({ history, setSession }) => {
  useEffect(() => {
    setSession();
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
});

export default connect(mapStateToProps, mapDispatchToProps)(GameOver);
