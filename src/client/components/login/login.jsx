/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Button, Input, FormControl, FormLabel, Box,
} from '@chakra-ui/core';
import { loginThunk, whoami } from '../../store/thunks/loginThunks';

const Login = ({ login, history }) => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password, history);
  };

  return (
    <Box w="100%" p={10} borderWidth="1px" rounded="lg" variantColor="teal" borderStyle="solid" maxW="sm">
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          placeholder="Enter your account name"
          type="text"
          value={email}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          placeholder="Enter your account name"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button
        onClick={handleSubmit}
        type="submit"
      >
        {' '}
        Login{' '}
      </Button>

    </Box>
  );
};

const mapDispatchToProps = (dispatch) => ({
  login: (username, password, history) => dispatch(loginThunk(username, password, history)),
  whoami: () => dispatch(whoami()),
});

export default connect(null, mapDispatchToProps)(Login);
