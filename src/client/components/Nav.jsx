import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = ({ session }) => (
  <div className="nav">
    <span>Alias: {session.name}</span>
    <div className="imgcontainer">
      <img className="logoimg" src="https://i.ibb.co/RhHJRWT/Bug-Out-Logo2.png" alt="BugOut" />
    </div>
    <span>
      <Link to="/login">Login</Link>
    </span>
  </div>
);

const mapStateToProps = ({ session }) => ({ session });

// const mapDispatchToProps = (dispatch) => ({
//   // setSession: () => dispatch(setSessionThunk()),
//   // updateUserAlias: (alias) => dispatch(updateNameThunk(alias)),
// });

export default connect(mapStateToProps, null)(Nav);
