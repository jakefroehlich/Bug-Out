/* eslint-disable max-len */
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
import ChatBox from './ChatBox';
import { addMessage, addPlayer, rmPlayer } from '../store/actions';
import {
  createGameThunk,
  startGameThunk,
  getNameThunk,
} from '../store/thunks';
import socket from '../utils/socket';

const CreateGame = ({
  history,
  getCurrentGame,
  game,
  addMsg,
  createGame,
  removePlayer,
}) => {
  const [rounds, setRounds] = useState(3);
  const [difficulty, setDifficulty] = useState('easy');

  // useEffect(() => {
  //   getCurrentGame();
  //   socket.on('playersUpdate', (name) => {
  //     upPlayers(name);
  //   });
  //   // socket.on('message', message => {
  //   //   console.log('createGame message', message)
  //   // });
  // }, []);

  useEffect(() => {
    if (game.code) {
      socket.emit('joinRoom', game.code);
      console.log('effect 1 used');
    }
  }, [game.code]);

  useEffect(() => {
    socket.on('message', (message) => {
      addMsg(message);
    });
    socket.on('playerUpdate', () => {
      console.log('new player!');
      getCurrentGame();
      // newPlayer(player);
    });
    socket.on('playerLeave', (player) => {
      console.log('player left :(');
      removePlayer(player);
    });

    console.log('effect 2 used!');
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}
        >
          <Box
            borderWidth="3px"
            borderColor="#d49619"
            borderStyle="solid"
            maxW="sm"
            rounded="lg"
            m={2}
            p={4}
            bg="#fabc41"
          >
            <Text>{`Room Code: ${game.code}`}</Text>
          </Box>
          <Box
            borderWidth="3px"
            borderColor="#1d7a1b"
            borderStyle="solid"
            maxW="sm"
            rounded="lg"
            h="100%"
            m={2}
            p={4}
            bg="#15c912"
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
            borderWidth="3px"
            borderColor="#3674b5"
            borderStyle="solid"
            maxW="sm"
            rounded="lg"
            m={2}
            bg="#00c3d9"
          >
            <Text fontSize="6xl">Settings</Text>
            <FormControl>
              <FormLabel>Difficulty:</FormLabel>
              <Select
                placeholder="Select Difficulty"
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="easy" defaultValue>
                  Easy
                </option>
                <option value="medium"> Medium </option>
                <option value="hard"> Hard </option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Rounds:</FormLabel>
              <Select
                placeholder="Select No. of Rounds"
                onChange={(e) => setRounds(e.target.value)}
              >
                <option value="1" defaultValue>
                  1
                </option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Select>
            </FormControl>
          </Box>
          <Box
            w="100%"
            overflowWrap="break-word"
            p={4}
            borderWidth="3px"
            borderColor="#c90c0c"
            borderStyle="solid"
            maxW="sm"
            rounded="lg"
            m={2}
            bg="tomato"
          >
            <Text>{`Invite Link: http://${window.location.href}/api/game/join/${game.id}`}</Text>
          </Box>
        </div>
        <Box
          bg="black"
          color="white"
          m="15px"
          w="20%"
          p={3}
          borderWidth="3px"
          borderStyle="solid"
          borderColor="#331566"
          rounded="lg"
        >
          <ChatBox />
        </Box>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Button
          h="10%"
          w="50%"
          m="auto"
          variantColor="teal"
          variant="outline"
          onClick={async () => {
            await createGame(rounds, difficulty, history);
          }}
        >
          Create
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ game, user, input }) => ({ game, user, input });

const mapDispatchToProps = (dispatch) => ({
  upPlayers: (name) => dispatch(updatePlayers(name)),
  getCurrentGame: (currentGameId) => dispatch(getCurrentGameThunk(currentGameId)),
  createGame: (rounds, difficulty, history) => dispatch(createGameThunk(rounds, difficulty, history)),
  newPlayer: (player) => dispatch(addPlayer(player)),
  removePlayer: (player) => dispatch(rmPlayer(player)),
  updateGame: (rounds, difficulty) => dispatch(updateGameThunk(rounds, difficulty)),
  addMsg: (msg) => dispatch(addMessage(msg)),
  getName: () => dispatch(getNameThunk()),
  startGame: (currentGameId) => dispatch(startGameThunk(currentGameId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame);
