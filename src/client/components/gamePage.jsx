/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, useDisclosure,
} from '@chakra-ui/core';
import moment from 'moment';
import GameNav from './GameNav';
import Editor from './editor';
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
    await getCurrentGame(match.params.id);
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
    <div
      className="gamepagecontainer"
    >
      <GameNav />
      <div
        className="gamepage"
      >
        <div
          className="box gamepageL"
        >
          <h1>{game.prompt.name}</h1>
          <p>{game.prompt.prompt}</p>
        </div>
        <Editor match={match} gamePageProps={game} />
        <div
          className="gamesidebar"
        >
          <Timer props={game} />
          <div className={givenPowerUp ? 'box powerupcontainer' : 'dimbox powerupcontainer'}>
            <span className="span">Power Up!</span>
            {givenPowerUp ? (
              <button
                type="button"
                className="button"
                onClick={() => {
                  socket.emit('powerUp', givenPowerUp.funcName);
                  setGivenPowerUp(null);
                }}
              >{givenPowerUp.name}
              </button>
            ) : (
              <div className="loaderContainer">
                <div className="loader" />
              </div>
            )}
          </div>
          <LeaveGameButton history={history} />
        </div>
        <div>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent className="modalcontainer">
              <ModalHeader className="modalheader">Round Over!</ModalHeader>
              <ModalBody className="modal">
                <div className="innermodal">
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
