/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Text, Box, Select, FormControl, Input, FormLabel, Button,
} from '@chakra-ui/core';
import axios from 'axios';
import { getCurrentGameThunk } from '../store/thunks';

const JoinGame = (props) => {
  const [gameCode, setGameCode] = useState('');
  const [gameFound, setGameFound] = useState(true);
  const host = window.location.hostname;
  const PORT = process.env.PORT || 3000;
  console.log('port is ', PORT);

  const { game, joinGame } = props;

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
          borderStyle="solid"
          maxW="sm"
          rounded="lg"
        >
          <Text fontSize="6xl" color="white">Join Game</Text>
          <FormControl>
            <Input
              placeholder="Enter Game Code"
              type="text"
              focusBorderColor="teal"
              value={gameCode}
              onChange={(e) => setGameCode(e.target.value)}
            />
            {!gameFound ? <Text> Game not found </Text> : null}
            <Button
              width="200px"
              variantColor="red"
              margin="5px"
              onClick={() => {
                console.log('hitting ', `${host}:${PORT}/api/game/joinGame`);
                axios
                  .put('/game/joinGame', { currentGameId: game.id, gameCode })
                  .then((res) => {
                    setGameFound(true);
                    props.history.push('/waiting');
                  })
                  .catch((e) => {
                    setGameFound(false);
                  });
              }}
            >
              Join Game!
            </Button>
          </FormControl>
          <Box w="100%">
            <Button
              width="200px"
              variantColor="orange"
              margin="5px"
              onClick={() => props.history.push('/create')}
            >
              Create Game
            </Button>
          </Box>
          <Box>
            <Button
              width="200px"
              variantColor="yellow"
              margin="5px"
              onClick={() => props.history.push('/login')}
            >
              Login
            </Button>
          </Box>
          <Box>
            <Button
              width="200px"
              variantColor="green"
              margin="5px"
              onClick={() => props.history.push('/')}
            >
              Main Page
            </Button>
          </Box>
          <Box>
            <Button
              width="200px"
              variantColor="purple"
              margin="5px"
            >How to Play
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  game: state.game,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentGame: () => dispatch(getCurrentGameThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame);
