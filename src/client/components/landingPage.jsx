/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Button, FormControl, Text, Box, Input,
} from '@chakra-ui/core';
import { getCurrentGameThunk, findRandomGameThunk } from '../store/thunks/gameThunks';
import { getNameThunk, updateNameThunk, makeHostThunk } from '../store/thunks/sessionThunks';

const LandingPage = ({
  game,
  history,
  updateName,
  findRandomGame,
}) => {
  const [name, setName] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          w="100%"
          bg="#14122b"
          p={5}
          borderWidth="3px"
          borderColor="#6b60eb"
          borderStyle="solid"
          maxW="sm"
          rounded="lg"
        >
          <Text fontSize="6xl" color="white">
            Bug Out!
          </Text>
          <FormControl>
            <Input
              placeholder="Enter your name to play"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              width="200px"
              variantColor="red"
              margin="5px"
              onClick={async () => {
                await findRandomGame(game.id);
              }}
              isDisabled={name === ''}
            >
              Join Random Room
            </Button>
            <Button
              width="200px"
              variantColor="orange"
              margin="5px"
              onClick={() => {
                history.push('/join');
                setName('');
              }}
              isDisabled={name === ''}
            >
              Join Game
            </Button>
          </FormControl>
          <Button
            width="200px"
            variantColor="yellow"
            margin="5px"
            onClick={() => {
              updateName(name);
              history.push('/create');
            }}
            isDisabled={name === ''}
          >
            Create Game
          </Button>
          <Button
            width="200px"
            variantColor="green"
            margin="5px"
            onClick={() => history.push('/login')}
            isDisabled={name === ''}
          >
            Login
          </Button>
          <Button
            width="200px"
            variantColor="purple"
            margin="5px"
            onClick={() => history.push('/howtoplay')}
          >
            How To Play
          </Button>
        </Box>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  user, game, session,
}) => ({
  user, game, session,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentGame: () => dispatch(getCurrentGameThunk()),
  getName: () => dispatch(getNameThunk()),
  findRandomGame: (currentGameId) => dispatch(findRandomGameThunk(currentGameId)),
  updateName: (name) => dispatch(updateNameThunk(name)),
  makeHost: () => dispatch(makeHostThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
