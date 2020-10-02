import React from 'react';
import { connect } from 'react-redux';
import Leaderboard from './leaderboard';

const GameOver = () => (
  <div>
    <div>Game Over</div>
    <Leaderboard />
  </div>
);

const mapStateToProps = ({
  game, user, input, session,
}) => ({
  game, user, input, session,
});

export default connect(mapStateToProps, null)(GameOver);
