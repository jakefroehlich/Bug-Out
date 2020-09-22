import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateNameThunk } from '../store/thunks';

const Nav = ({ session }) => {

  return (<div className="nav">
    <span>Alias: {session.name}</span>
    <img className="navimg" src="https://i.ibb.co/MDgDr1N/Bug-Out-Logo.png" alt="BugOut" />
    <span>
      <Link to="/login">Login</Link>
    </span>
  </div>
  );
};

const mapStateToProps = ({ session }) => ({ session });

const mapDispatchToProps = (dispatch) => ({
  // setSession: () => dispatch(setSessionThunk()),
  // updateUserAlias: (alias) => dispatch(updateNameThunk(alias)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
