import React from 'react';
import { connect } from 'react-redux';
import Leaderboard from './leaderboard';

const GameOver = () => (
  <div
    className="gameoverwrapper"
  >
    <div
      className="gameover"
    >
      <span>Game Over</span>
      <Leaderboard />
    </div>
  </div>
);

const mapStateToProps = ({
  game, user, input, session,
}) => ({
  game, user, input, session,
});

export default connect(mapStateToProps, null)(GameOver);
