import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, useDisclosure,
} from '@chakra-ui/core';
import Chatbox from './ChatBox';
import TheCompetition from './theCompetition';
import { setSessionThunk, getCurrentGameThunk, setRoundTimesThunk } from '../store/thunks';
import LeaveGameButton from './leaveGameButton';
import socket from '../utils/socket';
import GameStartTimer from './gameStartTimer';

const WaitingRoom = ({
  setSession, getCurrentGame, game, history, session,
  // setRoundTimes,
  match,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setSession();
  }, []);

  useEffect(() => {
    if (match.params.id) {
      console.log('match', match);
      getCurrentGame(match.params.id);
    }
  }, [match.params.id]);

  useEffect(() => {
    if (game.id) {
      socket.emit('joinRoom', game.id);
    }
    return () => {
      socket.emit('leaveRoom', game.id);
    };
  }, [game.id]);

  useEffect(() => {
    if (game.active) {
      onOpen();
    }
  }, [game.active]);

  console.log('game', game);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('startGame');
  };

  return (
    <div
      className="waitingroom"
    >
      <div
        className="waitingcomps"
      >
        <div
          className="nav"
        >
          <span>Alias : {session.name}</span>
          <span>Game code : {game.code}</span>
        </div>
        <div
          className="waitinginner"
        >
          <Chatbox />
          <div
            className="buttons"
          >
            <TheCompetition />
            <div
              className="innerbuttons"
            >
              <button
                type="submit"
                className={session.host ? 'button visible' : 'hidden'}
                onClick={handleSubmit}
              >Start Game
              </button>
              <LeaveGameButton history={history} />
            </div>
          </div>
        </div>
        <div>
          <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent className="modalcontainer">
              <ModalHeader className="modalheader">Prepare to Bugout!</ModalHeader>
              <ModalBody className="modal">
                <div
                  className="innermodal"
                >
                  <p>Game Starts in</p>
                  <GameStartTimer match={match} history={history} />
                </div>
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ game, user, session }) => ({ game, user, session });

const mapDispatchToProps = (dispatch) => ({
  getCurrentGame: (id) => dispatch(getCurrentGameThunk(id)),
  setSession: () => dispatch(setSessionThunk()),
  setRoundTimes: (id) => dispatch(setRoundTimesThunk(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom);
