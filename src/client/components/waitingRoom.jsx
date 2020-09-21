import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Chatbox from './ChatBox';
import TheCompetition from './theCompetition';
import { setSessionThunk, getCurrentGameThunk, setRoundTimes } from '../store/thunks';

//  Determine if user is host (if so, show the start game button)
//  bring in TheCompetition
//  bring in Chat

const WaitingRoom = ({
  setSession, getCurrentGame, game,
  // setRoundTimes,
}) => {
  useEffect(() => {
    setSession(); // I wanna know who you are, where you're from, what you did
    getCurrentGame();
  }, []);

  console.log('game', game);

  return (
    <div>
      <div>
        <TheCompetition />
        <Chatbox />
      </div>
      <div>
        <button
          type="submit"
          className={game.host ? 'visible' : 'hidden'}
          onClick={() => {}}
        >Start Game
        </button>
      </div>
    </div>
  );
};

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
// import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
// import {
//   Text,
//   Box,
//   Select,
//   FormControl,
//   FormLabel,
//   Button,
// } from '@chakra-ui/core';
// import Chatbox from './ChatBox';
// import { addPlayer, addMessage } from '../store/actions';
// import {
//   getCurrentGameThunk,
//   setSessionThunk,
// } from '../store/thunks';
// import socket from '../utils/socket';

// const WaitingRoom = ({
//   game,
//   getCurrentGame,
//   createGame,
//   history,
//   newPlayer,
//   addMsg,
//   setSession,
// }) => {
//   const [rounds, setRounds] = useState('');
//   const [difficulty, setDifficulty] = useState('Beginner');

//   useEffect(() => {
//     getCurrentGame();
//     setSession();
//     socket.on('message', (message) => {
//       addMsg(message);
//     });
//     socket.on('playerJoin', (player) => {
//       console.log('new player!');
//       getCurrentGame();
//     });
//   }, []);

//   useEffect(() => {
//     if (game.code) {
//       socket.emit('joinRoom', game.code);
//     }
//   }, [game.code]);

//   console.log('game is ', game);

//   return (
//     <div>
//       <div style={{ display: 'flex', justifyContent: 'center' }}>
//         <div
//           style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}
//         >
//           <Box
//             borderWidth="3px"
//             borderColor="#d49619"
//             borderStyle="solid"
//             maxW="sm"
//             rounded="lg"
//             m={2}
//             p={4}
//             bg="#fabc41"
//           >
//             <Text>{`Room Code: ${game.code}`}</Text>
//           </Box>
//           <Box
//             borderWidth="3px"
//             borderColor="#1d7a1b"
//             borderStyle="solid"
//             maxW="sm"
//             rounded="lg"
//             h="100%"
//             m={2}
//             p={4}
//             bg="15c912"
//           >
//             <Text>The Competition</Text>
//             {game.players.map((player) => (
//               <Text key={player.id}>{player.name ? player.name : 'Guest'}</Text>
//             ))}
//           </Box>
//         </div>
//         <div style={{ padding: '10px' }}>
//           <Box
//             w="100%"
//             p={4}
//             borderWidth="3px"
//             borderColor="#3674b5"
//             borderStyle="solid"
//             maxW="sm"
//             rounded="lg"
//             m={2}
//             bg="#00c3d9"
//           >
//             <Text fontSize="6xl">Settings</Text>
//             <FormControl>
//               <Text fontSize="1xl">{`Difficulty: ${game.difficulty}`}</Text>
//             </FormControl>
//             <FormControl>
//               <Text fontSize="1xl">{`Rounds: ${game.rounds}`}</Text>
//             </FormControl>
//           </Box>
//           <Box
//             w="100%"
//             overflowWrap="break-word"
//             p={4}
//             borderWidth="3px"
//             borderColor="#c90c0c"
//             borderStyle="solid"
//             maxW="sm"
//             rounded="lg"
//             m={2}
//             bg="tomato"
//           >
//             <Text>{`Invite Link: http://${window.location.href}/api/game/join/${game.id}`}</Text>
//           </Box>
//         </div>
//         <Box
//           bg="black"
//           color="white"
//           m="15px"
//           w="20%"
//           p={3}
//           borderWidth="3px"
//           borderStyle="solid"
//           borderColor="#331566"
//           rounded="lg"
//         >
//           <Chatbox />
//         </Box>
//       </div>
//       {/* <div style={{ textAlign: 'center' }}>
//         <Button
//           h="10%"
//           w="50%"
//           m="auto"
//           variantColor="teal"
//           variant="outline"
//           onClick={() => {
//             createGame(rounds, difficulty);
//             history.push('/loading-game');
//           }}
//         >
//           Play!
//         </Button>
//       </div> */}
//     </div>
//   );
// };

const mapStateToProps = ({ game, user }) => ({ game, user });

const mapDispatchToProps = (dispatch) => ({
  getCurrentGame: () => dispatch(getCurrentGameThunk()),
  // createGame: () => dispatch(createGameThunk(rounds, difficulty)),
  // newPlayer: (player) => dispatch(addPlayer(player)),
  // addMsg: (msg) => dispatch(addMessage(msg)),
  setSession: () => dispatch(setSessionThunk()),
  setRoundTimes: (id) => dispatch(setRoundTimes(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom);
