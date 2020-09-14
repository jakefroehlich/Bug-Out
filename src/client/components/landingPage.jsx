/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Input, FormControl, Text, Box } from '@chakra-ui/core';
import { getCurrentGameThunk, findRandomGameThunk } from '../store/thunks/gameThunks';

const LandingPage = ({
  game,
  // updateName,
  history,
  getCurrentGame,
  findRandomGame,
}) => {
  const [name, setName] = useState('')
  useEffect(() => {
    getCurrentGame();
  }, []);

  return (
    <div style={{display:'flex', flexDirection:'column'}}>
      <div style={{textAlign:'center', display:'flex', justifyContent:'center'}}>
        <Box w="100%" bg='#00c3d9' p={4} borderWidth='3px' borderColor='#3674b5' borderStyle='solid' maxW="sm" rounded="lg">
          <Text fontSize="6xl" color='white'>Bug Out!</Text>
          <FormControl>
            <Input
              placeholder="Enter your name to play"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button 
              width="200px" 
              variantColor="red"
              margin="5px"
              onClick={async () => {
                await findRandomGame(game.id)
                setName('')
              }}
            >Join Random Room
            </Button>
            <Button 
              width="200px" 
              variantColor="orange"
              margin="5px"
              onClick={() => {
              history.push('/join')
              setName('')
            }}
            >Join Game
            </Button>
          </FormControl>
          <Button 
            width="200px" 
            variantColor="yellow"
            margin="5px"
            onClick={() => history.push('/create')}
          >Create Game
          </Button>
          <Button 
            width="200px" 
            variantColor="green"
            margin="5px"
            onClick={() => history.push('/login')}
          >Login
          </Button>
          <Button 
            width="200px" 
            variantColor="blue"
            margin="5px"
            onClick={() => history.push('/howtoplay')}
          >How To Play
          </Button>
        </Box>
      </div>

    </div>
  );
};

const mapStateToProps = ({ user, game, input }) => ({ user, game, input });

const mapDispatchToProps = (dispatch) => {
  return {
  getCurrentGame: () => dispatch(getCurrentGameThunk()),
  findRandomGame: (currentGameId) => dispatch(findRandomGameThunk(currentGameId)),
}};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage); 
