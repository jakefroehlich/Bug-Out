/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Button, FormControl, Text, Box, Input,
} from '@chakra-ui/core';
import { getCurrentGameThunk, findRandomGameThunk, updateNameThunk } from '../store/thunks/gameThunks';
import { getNameThunk } from '../store/thunks/sessionThunks';

const LandingPage = ({
  game,
  history,
  getCurrentGame,
  updateName,
  findRandomGame,
}) => {
  const [name, setName] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [noName, setNoName] = useState(false);
  useEffect(() => {
    getCurrentGame();
    getName();
  }, []);

  useEffect(() => {
    if (session.name) {
      setName(session.name);
      setNoName(false);
    }
  });

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
          bg="#4287f5"
          p={4}
          borderWidth="3px"
          borderColor="#0c2c61"
          borderStyle="solid"
          maxW="sm"
          rounded="lg"
        >
          <Text fontSize="6xl" color="white">
            Bug Out!
          </Text>
          <FormControl>
            {session.name ? (<Text> {`Welcome ${session.name}!`} </Text>) : null}
            {noName ? (<Text> Please put in a name! </Text>) : null }
            <Input
              placeholder="Enter your name to play"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {noName ? <p>Enter name to continue</p> : ''}
            <Button
              width="200px"
              variantColor="red"
              margin="5px"
              onClick={async () => {
                await findRandomGame(game.id);
                setName('');
              }}
            >
              Join Random Room
            </Button>
            <Button
              width="200px"
              variantColor="orange"
              margin="5px"
              onClick={() => {
                if (name === '' || noName === true) {
                  setNoName(true);
                } else {
                  updateName(name);
                  history.push('/join');
                  setName('');
                }
              }}
            >
              Join Game
            </Button>
          </FormControl>
          <Button
            width="200px"
            variantColor="yellow"
            margin="5px"
            onClick={() => {
              if (name === '' || noName === true) {
                setNoName(true);
              } else {
                updateName(name);
                history.push('/create');
                setName('');
              }
            }}
          >
            Create Game
          </Button>
          <Button
            width="200px"
            variantColor="green"
            margin="5px"
            onClick={() => history.push('/login')}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
