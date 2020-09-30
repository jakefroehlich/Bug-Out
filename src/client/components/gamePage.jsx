/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Box, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, useDisclosure, Button,
} from '@chakra-ui/core';
import moment from 'moment';
import Editor from './editor';
import ChatBox from './ChatBox';
import Timer from './timer2';
import RoundStartTimer from './RoundStartTimer';
import { LeaveGameButton } from './index';
import { setPowerUp } from '../utils';
import {
  getPowerUpsThunk, getCurrentGameThunk, getPromptThunk, setSessionThunk,
} from '../store/thunks';
import socket from '../utils/socket';

const GamePage = ({
  game, getPowerUps, getCurrentGame, history, match, setSession,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [givenPowerUp, setGivenPowerUp] = useState(null);
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    getPowerUps();
    setSession();
    getCurrentGame(match.params.id);
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
  }, [game.roundOver, game.players]);
  useEffect(() => {
    const powerUpTimerId = setInterval(() => {
      if (!givenPowerUp) {
        const powerUp = setPowerUp(game.powerUps);
        console.log('powerUp given ,', powerUp);
        setGivenPowerUp(powerUp);
        clearInterval(powerUpTimerId);
      }
    }, 5000); // runs every 20 seconds;
    return () => {
      clearInterval(powerUpTimerId);
    };
  });
  useEffect(() => {
    const current = moment().unix();
    let secondsLeft = game.roundEndUnix - current;
    const timeLeft = setInterval(() => {
      if (secondsLeft) {
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
          Power Up
          {givenPowerUp ? (
            <Button
              className="powerUpButton"
              onClick={() => {
                socket.emit('powerUp', givenPowerUp.funcName);
                setGivenPowerUp(null);
              }}
            >{givenPowerUp.name}
            </Button>
          ) : null }
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
