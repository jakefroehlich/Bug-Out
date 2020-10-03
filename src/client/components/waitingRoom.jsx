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
    if (game.id && session.name) {
      socket.emit('joinRoom', game.id, session.name);
    }
    return () => {
      socket.emit('leaveRoom', game.id);
    };
  }, [game.id, session.name]);

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
          <span>Alias: <div className="navname">{session.name}</div></span>
          <div className="dropdown">
            <span>Rules</span>
            <div className="dropdowncontent">
              <p>Each round you will be given a prompt (of selected difficulty) to complete.
                While you do so, you and your competitors will be given powerups randomly.
                Use them to bug your competitors code and race to the finish
                - only first place of each round gets points!
              </p>
            </div>
          </div>
          <div className="dropdown">
            <span>Credit</span>
            <div className="dropdowncontent">
              <p>Bug Out was created by BugOutBrxs LLC (Joe Spicuzza, Sanghyuk Kwon,
                Chad Nuckols, and Jake Froehlich) in partnership with FullStack Academy
                (Special thanks to Eliot, Deanna, and Thompson - 2004FLEX fo lyfe)
              </p>
            </div>
          </div>
          <span>Game code: <div className="navname">{game.code}</div></span>
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
            <ModalContent>
              <ModalHeader>Prepare to Bugout!</ModalHeader>
              <ModalBody>
                <div>
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
