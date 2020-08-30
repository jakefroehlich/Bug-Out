import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { whoami } from '../store/thunks/loginThunks';

const NavBar = ({ whoAmI, user }) => {
  const [isAdmin, setAdmin] = useState(false)
  const [isMember, setMember] = useState(false)

  useEffect(() => {
    whoAmI();
  }, []);

  useEffect(() => {
    if (user.role === 'admin') {
      setAdmin(true)
    } else {
      setAdmin(false)
    }
  }, [user]);

  useEffect(() => {
    if (user.role === 'member') {
      setMember(true)
    } else {
      setMember(false)
    }
  }, [user]);

  return (
    <div>
      <nav className="navbar is-light" role="navigation" aria-label="main navigation">
        <Link to="/" className="navbar-item">Home</Link>
        <Link to="/login" className="navbar-item">{user.email? 'Log Out' : 'Login'}</Link>
        {isAdmin &&
          <Link to="/admin" className="navbar-item">Admin</Link>}
        {isMember || isAdmin &&
          <Link to="/request" className="navbar-item">Submit Request</Link>
        }
      </nav>
    </div>
  );
}

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = (dispatch) => ({
  whoAmI: () => dispatch(whoami()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);