import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createGameThunk } from '../store/thunks';

const CreateGame = ({
    createGame,
    history
}) => {
    const [rounds, setRounds] = useState(3);
    const [difficulty, setDifficulty] = useState('easy');

    const handleSubmit = (e) => {
        e.preventDefault();
        createGame(rounds, difficulty, history);
    }

    return (
        <div>
            <span>Create A Game</span>
            <form
                className="createGameForm"
                onSubmit={handleSubmit}>
                <label>Difficulty: </label>
                <select
                    placeholder="Select Difficulty"
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option value="easy" defaultValue> Easy </option>
                    <option value="medium"> Medium </option>
                    <option value="hard"> Hard </option>
                </select>
                <label># of Rounds: </label>
                <select
                    placeholder="Select # of Rounds"
                    onChange={(e) => setRounds(e.target.value)}
                >
                    <option value="1" defaultValue> 1 </option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button />
            </form>
        </div>
    )
}

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

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame);