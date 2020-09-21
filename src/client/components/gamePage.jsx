import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, Text } from '@chakra-ui/core';
import Editor from './editor';
import ChatBox from './ChatBox';
import Timer from './timer2';
import LeaveGameButton from './leaveGameButton';
import { getPowerUpsThunk, getCurrentGameThunk, getPromptThunk } from '../store/thunks';

const GamePage = ({
  game, getPowerUps, getCurrentGame, fetchPrompt, match,
}) => {
  useEffect(() => {
    console.log('gamepage effect used', match);
    getPowerUps();
    getCurrentGame(match.params.id);
    // fetchPrompt(game.difficulty);
  }, []);

  useEffect(() => {
    if (game.difficulty) {
      console.log(game.difficulty);
      fetchPrompt(game.difficulty);
    }
  }, [game.difficulty]);

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
        </Box>
      </div>
      <Editor />
      <div>
        <Timer />
        <Box bg="black" height="75%" w="90%" color="white" m="15px" p={3} borderWidth="3px" borderStyle="solid" borderColor="#331566" rounded="lg">
          <ChatBox />
        </Box>
        <LeaveGameButton passedProps={{ game }} />
      </div>
    </div>
  );
};
const mapStateToProps = (props) => (props);

const mapDispatchToProps = (dispatch) => ({
  getPowerUps: () => dispatch(getPowerUpsThunk()),
  getCurrentGame: (id) => dispatch(getCurrentGameThunk(id)),
  fetchPrompt: (difficulty) => dispatch(getPromptThunk(difficulty)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
