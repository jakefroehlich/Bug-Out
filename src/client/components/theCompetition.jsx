import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCurrentGameThunk } from '../store/thunks';

//  Displays all the players in a given room
const TheCompetition = ({ getCurrentGame, game }) => {
  const [roomPlayers, setRoomPlayers] = useState([]);

  useEffect(() => {
    getCurrentGame();
  }, []);

  //  Update the players from redux store
  useEffect(() => {
    setRoomPlayers(game.players);
  }, [game.players.length]);

  return (
    <div>
      <div>The Competition</div>
      <div>
        {
          roomPlayers.length
            ? roomPlayers.map((player) => <p key={player.id}>n: {player.name} id: {player.id}</p>)
            : ''
        }
      </div>
    </div>
  );
};

const mapStateToProps = ({ game }) => ({
  game,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentGame: () => dispatch(getCurrentGameThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TheCompetition);
