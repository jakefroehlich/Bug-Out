import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSessionThunk } from '../store/thunks';

const Nav = ({ setSession, session }) => {
  useEffect(() => {
    setSession();
  });

  //  TODO: add in classes below and logo image
  return (
    <div>
      <span>Alias: {session.name}</span>
      <span>Logo IMG</span>
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
