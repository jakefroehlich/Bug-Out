import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSessionThunk } from '../store/thunks';

const Nav = ({ session }) => {

  //  TODO: add in classes below and logo image
  return (
    <div className="nav">
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
  setSession: () => dispatch(setSessionThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
