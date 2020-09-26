/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Box, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, useDisclosure,
} from '@chakra-ui/core';
import moment from 'moment';
import Editor from './editor';
import ChatBox from './ChatBox';
import Timer from './timer2';
import RoundStartTimer from './RoundStartTimer';
import { LeaveGameButton } from './index';
// import { setPowerUp } from '../utils';
import {
  getPowerUpsThunk, getCurrentGameThunk, getPromptThunk, setSessionThunk,
} from '../store/thunks';
import socket from '../utils/socket';

const GamePage = ({
  game, getPowerUps, getCurrentGame, history, match, setSession,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [givenPowerUps, setGivenPowerUps] = useState([]);
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    getPowerUps();
    getCurrentGame(match.params.id);
    setSession();
    // fetchPrompt(game.difficulty);
  }, []);

  const endRound = async () => {
    await setStandings(game.players.sort((a, b) => a.score - b.score));
    onOpen();
    socket.emit('roundOver');
  };

  useEffect(() => {
    if (game.roundOver) {
      endRound();
    }
  }, [game.roundOver]);
  // const timerId = setInterval(() => {
  //   // console.log('timer run!');
  //   const powerUp = setPowerUp(game.powerUps);
  //   if (powerUp) {
  //     setGivenPowerUps([...givenPowerUps, powerUp]);
  //     console.log('givenPowerUps is ', givenPowerUps);
  //     // console.log('powerup given and givenPowerUps is ', givenPowerUps);
  //   }
  // }, 1000); // runs every 10 seconds;

  // setTimeout(() => { clearInterval(timerId); }, 1000 * 60 * 10); // 10 minutes
  useEffect(() => {
    const current = moment().unix();
    let secondsLeft = game.roundEndUnix - current;
    const timeLeft = setInterval(() => {
      if (secondsLeft) {
        console.log('secondsleft:', secondsLeft);
        secondsLeft -= 1;
      } else {
        endRound();
      }
    }, 1000);

    return () => {
      clearInterval(timeLeft);
    };
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ height: '80vh' }}>
        <Box bg="tomato" h="40%" w="110px" m={3} p={4} color="white" borderWidth="3px" borderColor="#c90c0c" borderStyle="solid" rounded="lg">
          Competition
          {game.players ? game.players.map((player) => (
            <Text key={player.id}>{player.name ? player.name : 'Guest'}</Text>
          )) : null}
        </Box>
        <Box bg="#fabc41" h="60%" w="110px" m={3} p={4} color="white" borderWidth="3px" borderColor="#d49619" borderStyle="solid" rounded="lg">
          Power Ups
          {/* <ul>
            {givenPowerUps.map((el) => (
              <li id>
                {powerUpButton(el)}
              </li>
            ))}
          </ul> */}
        </Box>
      </div>
      <Editor match={match} gamePageProps={game} />
      <div>
        <Timer props={game} />
        <Box bg="black" height="75%" w="90%" color="white" m="15px" p={3} borderWidth="3px" borderStyle="solid" borderColor="#331566" rounded="lg">
          <ChatBox />
        </Box>
        <LeaveGameButton history={history} />
      </div>
      <div>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Round Over!</ModalHeader>
            <ModalBody>
              <div>
                <p>Current Scores:</p>
                <ol>
                  {standings.map((player) => <li key={player.id}>{player.name}: {player.score}</li>)}
                </ol>
                <RoundStartTimer match={match} history={history} />
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};
const mapStateToProps = (props) => (props);

const mapDispatchToProps = (dispatch) => ({
  getPowerUps: () => dispatch(getPowerUpsThunk()),
  getCurrentGame: (id) => dispatch(getCurrentGameThunk(id)),
  fetchPrompt: (difficulty) => dispatch(getPromptThunk(difficulty)),
  setSession: () => dispatch(setSessionThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
