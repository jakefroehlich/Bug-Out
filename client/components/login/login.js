import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginThunk, whoami } from '../../store/thunks/loginThunks';
import store from '../../store/index.js';

const Login = ({ login, history }) => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password, history);
  };

  return (
    <form>
      <label>
        Username:
        <input value={email} type='username' onChange={(e) => setUsername(e.target.value)}></input>
      </label>
      <label>
        Password:
        <input value={password} type='password' onChange={(e) => setPassword(e.target.value)}></input>
      </label>
      <button  onClick={handleSubmit} type='submit'> Login </button>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  login: (username, password, history) => dispatch(loginThunk(username, password, history)),
  whoami: () => dispatch(whoami()),
});

export default connect(null, mapDispatchToProps)(Login);