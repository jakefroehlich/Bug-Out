import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Chatbox from './ChatBox';
import TheCompetition from './theCompetition';
import { setSessionThunk, getCurrentGameThunk, setRoundTimesThunk } from '../store/thunks';
import LeaveGameButton from './leaveGameButton';

const WaitingRoom = ({
  setSession, getCurrentGame, game, history,
  setRoundTimes, match,
}) => {
  useEffect(() => {
    setSession(); // I wanna know who you are, where you're from, what you did
    getCurrentGame(match.params.id);
  }, []);

  console.log('game', game);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (game) {
      history.push(`/game/${match.params.id}`);
      setRoundTimes(game.id);
    } else {
      console.log('no game!');
    }
  };

  return (
    <div
      className="waitingroom"
    >
      <div
        className="waitingcomps"
      >
        <TheCompetition />
        <Chatbox />
      </div>
      <button
        type="submit"
        className={game.host ? 'visible' : 'hidden'}
        onClick={handleSubmit}
      >Start Game
      </button>
      <LeaveGameButton history={history} />
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
