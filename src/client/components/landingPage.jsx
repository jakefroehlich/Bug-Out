/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  updateNameThunk,
  setSessionThunk,
} from '../store/thunks';

const LandingPage = ({
  setSession,
  updateUserAlias,
  history,
}) => {
  const [alias, setAlias] = useState('Guest');

  useEffect(() => {
    setSession();
    axios.put('/session/reset-score');
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
          <img className="landingimg" src="https://i.ibb.co/RhHJRWT/Bug-Out-Logo2.png" alt="BugOut" />
          <input
            className="input"
            type="text"
            // value={alias}
            placeholder="Enter Preferred Alias"
            onChange={(e) => setAlias(e.target.value)}
          />
        </div>
      </div>
      {/* <CodeEditor2 match={match}/> */}
    </form>
  );
};

const mapStateToProps = ({
  user, game, session,
}) => ({
  user, game, session,
});

const mapDispatchToProps = (dispatch) => ({
  setSession: () => dispatch(setSessionThunk()),
  updateUserAlias: (alias) => dispatch(updateNameThunk(alias)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
