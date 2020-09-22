import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, Text, Button } from '@chakra-ui/core';
import {
  Editor, ChatBox, Timer, LeaveGameButton,
} from './index';
import { setPowerUp } from '../utils';
import { getPowerUpsThunk, getCurrentGameThunk } from '../store/thunks/gameThunks';

const GamePage = ({
  game, getPowerUps, getCurrentGame, history,
}) => {
  const [givenPowerUps, setGivenPowerUps] = useState([]);

  useEffect(() => {
    console.log('gamepage effect used');
    getPowerUps();
    getCurrentGame();
    // fetchPrompt(game.difficulty);
  }, []);

  console.log('game', game)

  const timerId = setInterval(() => {
    // console.log('timer run!');
    const powerUp = setPowerUp(game.powerUps);
    if (powerUp) {
      setGivenPowerUps([...givenPowerUps, powerUp]);
      // console.log('powerup given and givenPowerUps is ', givenPowerUps);
    }
  }, 1000); // runs every 10 seconds;
  setTimeout(() => { clearInterval(timerId); }, 1000 * 60 * 10); // 10 minutes

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
          <ul>
            {givenPowerUps.map((el) => (
              <li>
                <Button
                  id={el.id}
                  onClick={() => null}
                >
                  {el.name}
                </Button>
              </li>
            ))}
          </ul>
        </Box>
      </div>
      <Editor />
      <div>
        <Timer props={game}/>
        <Box bg="black" height="75%" w="90%" color="white" m="15px" p={3} borderWidth="3px" borderStyle="solid" borderColor="#331566" rounded="lg">
          <ChatBox />
        </Box>
        <LeaveGameButton history={history} />
      </div>
    </div>
  );
};
const mapStateToProps = (props) => (props);

const mapDispatchToProps = (dispatch) => ({
  getPowerUps: () => dispatch(getPowerUpsThunk()),
  getCurrentGame: () => dispatch(getCurrentGameThunk()),
  fetchPrompt: (difficulty) => dispatch(getPromptThunk(difficulty)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
