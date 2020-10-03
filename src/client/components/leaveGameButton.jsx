import React from 'react';
import { connect } from 'react-redux';
import { leaveGameThunk } from '../store/thunks/index';

const LeaveGameButton = (props) => {
  const { game, leaveGame } = props;
  const { history } = props;
  return (
    <button
      className="button"
      type="button"
      onClick={async () => {
        await leaveGame(game.id);
        history.push('/');
      }}
    >Leave Game
    </button>
  );
};

const mapStateToProps = (props) => (props);

const mapDispatchToProps = (dispatch) => ({
  leaveGame: () => dispatch(leaveGameThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeaveGameButton);
