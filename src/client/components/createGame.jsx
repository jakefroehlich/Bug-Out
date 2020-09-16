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
import {
  createGameThunk,
  getCurrentGameThunk,
} from '../store/thunks/gameThunks';

const CreateGame = (props) => {
  const {
    history, getCurrentGame, game,
  } = props;
  const [rounds, setRounds] = useState('');
  const [difficulty, setDifficulty] = useState('Beginner');
  console.log(props);
  // const socket = io();

  useEffect(() => {
    getCurrentGame();
    console.log(props);
    // socket.on('message', message => {
    //   console.log('createGame message', message)
    // });
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
            {game.players.map((player) => (<Text key={player.id}>{player.name ? (player.name) : 'Guest' }</Text>))}
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
              <Select placeholder="Select Difficulty" onChange={(e) => setDifficulty(e.target.value)}>
                <option value="Beginner" defaultValue>Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Difficult">Difficult</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Rounds:</FormLabel>
              <Select placeholder="Select No. of Rounds" onChange={(e) => setRounds(e.target.value)}>
                <option value="1" defaultValue>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Select>
            </FormControl>
          </Box>
          <Box w="100%" overflowWrap="break-word" p={4} borderWidth="3px" borderColor="#c90c0c" borderStyle="solid" maxW="sm" rounded="lg" m={2} bg="tomato">
            <Text>{`Invite Link: http://${window.location.href}/api/game/join/${game.id}`}</Text>
          </Box>
        </div>
        <Box bg="black" color="white" m="15px" w="20%" p={3} borderWidth="3px" borderStyle="solid" borderColor="#331566" rounded="lg">
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
          onClick={() => {
            createGame(rounds, difficulty);
            history.push('/loading-game');
          }}
        >
          Play!
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  game, user, input, session,
}) => ({
  game, user, input, session,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentGame: () => dispatch(getCurrentGameThunk()),
  createGame: (rounds, difficulty) => dispatch(createGameThunk(rounds, difficulty)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame);
