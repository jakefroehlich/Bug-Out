/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CreateGame from './createGame';
import JoinGame from './joinGame';
import Nav from './Nav';
import {
  setSessionThunk,
  getCurrentGameThunk,
  removeHostThunk,
} from '../store/thunks';
import { resetGame } from '../store/actions';
import socket from '../utils/socket';

const GameConsole = ({
  history,
  game,
  session,
  setSession,
  rmHost,
  reset,
}) => {
  useEffect(() => {
    setSession();
    if (game.id) {
      reset();
      socket.emit('leaveRoom', game.id, session.name);
    }
  }, []);

  return (
    <div className="imgcontainer">
      <div className="outerconsole">
        <Nav session={session} />
        <div className="consolecontainer">
          <CreateGame history={history} />
          <JoinGame history={history} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  game, user, input, session, messages,
}) => ({
  game, user, input, session, messages,
});

const mapDispatchToProps = (dispatch) => ({
  setSession: () => dispatch(setSessionThunk()),
  getCurrentGame: (currentGameId) => dispatch(getCurrentGameThunk(currentGameId)),
  rmHost: () => dispatch(removeHostThunk()),
  reset: () => dispatch(resetGame()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameConsole);
