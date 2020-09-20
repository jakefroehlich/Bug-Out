/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  Box,
  Select,
  FormControl,
  FormLabel,
  Button,
} from '@chakra-ui/core';
import CreateGame from './createGame';
import { addMessage, addPlayer, rmPlayer } from '../store/actions';
import {
  createGameThunk,
  startGameThunk,
  setSessionThunk,
  getCurrentGameThunk,
} from '../store/thunks';

const GameConsole = ({
  history,
  game,
  session,
  updateGame,
  getCurrentGame,
  startGame,
  createGame,
}) => {
  const [rounds, setRounds] = useState(3);
  const [difficulty, setDifficulty] = useState('easy');
  const thisPlayer = game.players.filter((p) => p.id === session.id)[0];
  console.log('game', game);

  return (
    <div className='outerConsole'>
      {/* <Nav className='Nav'/> */}
      <div className='consoleContainer'>
        <div className='createGame'>
          <CreateGame />
        </div>
        <div className='joinGame'>
          {/* <JoinGame /> */}
        </div>
      </div>
    </div>
  )
  // return (
  //   <div>
  //     <div style={{ display: 'flex', justifyContent: 'center' }}>
  //       <div
  //         style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}
  //       >
  //         <Box
  //           borderWidth="3px"
  //           borderColor="#d49619"
  //           borderStyle="solid"
  //           maxW="sm"
  //           rounded="lg"
  //           m={2}
  //           p={4}
  //           bg="#fabc41"
  //         >
  //           <Text>{`Room Code: ${game.code}`}</Text>
  //         </Box>
  //         <Box
  //           borderWidth="3px"
  //           borderColor="#1d7a1b"
  //           borderStyle="solid"
  //           maxW="sm"
  //           rounded="lg"
  //           h="100%"
  //           m={2}
  //           p={4}
  //           bg="#15c912"
  //         >
  //           <Text>The Competition</Text>
  //           {game.players.map((player) => (
  //             <Text key={player.id}>{player.name ? player.name : 'Guest'}</Text>
  //           ))}
  //         </Box>
  //       </div>
  //       <div style={{ padding: '10px' }}>
  //         <Box
  //           w="100%"
  //           p={4}
  //           borderWidth="3px"
  //           borderColor="#3674b5"
  //           borderStyle="solid"
  //           maxW="sm"
  //           rounded="lg"
  //           m={2}
  //           bg="#00c3d9"
  //         >
  //           <Text fontSize="6xl">Settings</Text>
  //           <FormControl>
  //             <FormLabel>Difficulty:</FormLabel>
  //             <Select
  //               placeholder="Select Difficulty"
  //               onChange={(e) => setDifficulty(e.target.value)}
  //             >
                // <option value="easy" defaultValue>
                //   Easy
                // </option>
                // <option value="medium"> Medium </option>
                // <option value="hard"> Hard </option>
  //             </Select>
  //           </FormControl>
  //           <FormControl>
  //             <FormLabel>Rounds:</FormLabel>
  //             <Select
  //               placeholder="Select No. of Rounds"
  //               onChange={(e) => setRounds(e.target.value)}
  //             >
                // <option value="1" defaultValue>
                //   1
                // </option>
                // <option value="2">2</option>
                // <option value="3">3</option>
                // <option value="4">4</option>
                // <option value="5">5</option>
  //             </Select>
  //           </FormControl>
  //         </Box>
  //         <Box
  //           w="100%"
  //           overflowWrap="break-word"
  //           p={4}
  //           borderWidth="3px"
  //           borderColor="#c90c0c"
  //           borderStyle="solid"
  //           maxW="sm"
  //           rounded="lg"
  //           m={2}
  //           bg="tomato"
  //         >
  //           <Text>{`Invite Link: http://${window.location.href}/api/game/join/${game.id}`}</Text>
  //         </Box>
  //       </div>
  //       <Box
  //         bg="black"
  //         color="white"
  //         m="15px"
  //         w="20%"
  //         p={3}
  //         borderWidth="3px"
  //         borderStyle="solid"
  //         borderColor="#331566"
  //         rounded="lg"
  //       >
  //         <ChatBox />
  //       </Box>
  //     </div>
  //     <div style={{ textAlign: 'center' }}>
  //       <Button
  //         h="10%"
  //         w="50%"
  //         m="auto"
  //         variantColor="teal"
  //         variant="outline"
  //         onClick={async () => {
  //           await createGame(rounds, difficulty, history);
  //         }}
  //       >
  //         Create
  //       </Button>
  //     </div>
  //   </div>
  // );
};

const mapStateToProps = ({ game, user, input, session, messages }) => ({ game, user, input, session, messages });

const mapDispatchToProps = (dispatch) => ({
  upPlayers: (name) => dispatch(updatePlayers(name)),
  getCurrentGame: (currentGameId) => dispatch(getCurrentGameThunk(currentGameId)),
  createGame: (rounds, difficulty, history) => dispatch(createGameThunk(rounds, difficulty, history)),
  newPlayer: (player) => dispatch(addPlayer(player)),
  removePlayer: (player) => dispatch(rmPlayer(player)),
  updateGame: (rounds, difficulty) => dispatch(updateGameThunk(rounds, difficulty)),
  addMsg: (msg) => dispatch(addMessage(msg)),
  setSession: () => dispatch(setSessionThunk()),
  startGame: (currentGameId) => dispatch(startGameThunk(currentGameId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameConsole);


//This is partly because i've been fucking with it so.

//I think we need to revert to the last commit

//YOu can just share your screen for a sec if you want