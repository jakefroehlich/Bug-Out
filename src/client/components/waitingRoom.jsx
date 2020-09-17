/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  Box,
  Select,
  FormControl,
  FormLabel,
  Button,
} from '@chakra-ui/core';
import {
  updatePlayers
} from '../store/actions';
import {
  createGameThunk,
  getCurrentGameThunk,
} from '../store/thunks/gameThunks';
import Chatbox from './ChatBox';
import socket from '../utils/socket';

const WaitingRoom = ({
  game,
  getCurrentGame,
  createGame,
  history,
  upPlayers
}) => {
  const [rounds, setRounds] = useState('');
  const [difficulty, setDifficulty] = useState('Beginner');

  useEffect(() => {
    getCurrentGame();
    socket.on('message', (message) => {
      addMsg(message);
    });
    socket.on('playersUpdate', (name) => {
      upPlayers(name);
    });
  }, []);

  useEffect(() => {
    if (game.code) {
      socket.emit('joinRoom', game.code);
    }
  }, [game.code]);

  console.log('game is ', game);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}
      >
        <Box
          borderWidth="1px"
          borderColor="black"
          borderStyle="solid"
          maxW="sm"
          rounded="lg"
          m={2}
          p={4}
        >
          <Text>{`Room Code: ${game.code}`}</Text>
        </Box>
        <Box
          borderWidth="1px"
          borderColor="black"
          borderStyle="solid"
          maxW="sm"
          rounded="lg"
          h="100%"
          m={2}
          p={4}
        >
          <Text>The Competition</Text>
          {game.players.map((player) => (
            <Text key={player.id}>{player.name ? player.name : 'Guest'}</Text>
          ))}
        </Box>
      </div>
      <div style={{ padding: '10px' }}>
        <Box
          w="100%"
          p={4}
          borderWidth="1px"
          borderColor="black"
          borderStyle="solid"
          maxW="sm"
          rounded="lg"
          m={2}
        >
          <Text fontSize="6xl">Settings</Text>
          <FormControl>
            <Text fontSize="1xl">{`Difficulty: ${game.difficulty}`}</Text>
          </FormControl>
          <FormControl>
            <Text fontSize="1xl">{`Rounds: ${game.rounds}`}</Text>
          </FormControl>
        </Box>
        <Box
          w="100%"
          p={4}
          borderWidth="1px"
          borderColor="black"
          borderStyle="solid"
          maxW="sm"
          rounded="lg"
          m={2}
        >
          <Text>{`Invite Link: http://${window.location.href}/api/game/join/${game.id}`}</Text>
        </Box>
      </div>
      <div style={{ margin: '60px' }}>
        <Button
          h="100%"
          onClick={() => {
            createGame(rounds, difficulty);
            history.push('/loading-game');
          }}
        >
          Play!
        </Button>
      </div>
      <Chatbox />
    </div>
  );
};

const mapStateToProps = (state) => ({
  game: state.game,
  user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  getCurrentGame: () => dispatch(getCurrentGameThunk()),
  createGame: () => dispatch(createGameThunk(rounds, difficulty)),
  upPlayers: (name) => dispatch(updatePlayers(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom);
