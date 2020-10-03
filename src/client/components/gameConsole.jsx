/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CreateGame from './createGame';
import JoinGame from './joinGame';
import Nav from './Nav';
import socket from '../utils/socket';
import {
  removeHostThunk,
  setSessionThunk,
  getCurrentGameThunk,
} from '../store/thunks';

const GameConsole = ({
  history,
  session,
  setSession,
  rmHost,
}) => {
  useEffect(() => {
    setSession();
    socket.emit('discon');
  }, []);

  useEffect(() => {
    setSession();
  }, [session]);

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
});

export default connect(mapStateToProps, mapDispatchToProps)(GameConsole);
