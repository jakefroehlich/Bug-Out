import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@chakra-ui/core';
import { leaveGameThunk } from '../store/thunks/index';

const LeaveGameButton = (props) => {
  const { game, leaveGame } = props;
  const { history } = props;
  console.log(props);
  return (
    <Button
      onClick={async () => {
        await leaveGame(game.id);
        history.push('/');
      }}
    >Leave Game
    </Button>
  );
};

const mapStateToProps = (props) => (props);

const mapDispatchToProps = (dispatch) => ({
  leaveGame: () => dispatch(leaveGameThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeaveGameButton);
