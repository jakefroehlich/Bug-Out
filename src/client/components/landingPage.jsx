/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import {
//   Button, FormControl, Text, Box, Input,
// } from '@chakra-ui/core';
import {
  // getCurrentGaeThunk,
  // findRandomGameThunk,
  updateNameThunk,
  setSessionThunk,
  // makeHostThunk,
  // updateGameCodeThunk,
} from '../store/thunks';
// import { updateAlias } from '../store/actions';

const LandingPage = ({
  session,
  setSession,
  updateUserAlias,
  history,
}) => {
  const [alias, setAlias] = useState('Guest');

  console.log('session', session);
  console.log('alias', alias);

  useEffect(() => {
    setSession();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserAlias(alias);
    history.push('/console');
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      <div className="landing">
        <div
          className="landingform"
        >
          <img className="landingimg" src="https://i.ibb.co/MDgDr1N/Bug-Out-Logo.png" alt="BugOut" />
          <input
            className="landingInput"
            type="text"
            // value={alias}
            placeholder="Enter Preferred Alias"
            onChange={(e) => setAlias(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = ({
  user, game, session,
}) => ({
  user, game, session,
});

const mapDispatchToProps = (dispatch) => ({
  // getCurrentGame: () => dispatch(getCurrentGameThunk()),
  setSession: () => dispatch(setSessionThunk()),
  // findRandomGame: (currentGameId) => dispatch(findRandomGameThunk(currentGameId)),
  // updateName: (name) => dispatch(updateNameThunk(name)),
  // removePlayer: (player) => dispatch(rmPlayer(player)),
  // makeHost: () => dispatch(makeHostThunk()),
  // generateCode: (code) => dispatch(updateGameCodeThunk(code)),
  updateUserAlias: (alias) => dispatch(updateNameThunk(alias)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

// I made this one tonight
