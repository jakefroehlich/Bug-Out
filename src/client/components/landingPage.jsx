/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Input, FormControl, Text, Box } from '@chakra-ui/core';
import { playAsGuestThunk, findRandomGame } from '../store/thunks/gameThunks';
import {updateInput} from '../store/actions';

const LandingPage = (
  {
    user,
    game,
    input,
    history,
    playAsGuestThunk, 
    findRandomGame,
    updatePlayerName
  }) => {
  const [name, setName] = useState('')

  console.log('input', input)

  return (
    <div style={{display:'flex', flexDirection:'column'}}>
      <div style={{textAlign:'center', display:'flex', justifyContent:'center'}}>
        <Box w="100%" p={4} borderWidth='1px' borderColor='black' borderStyle='solid' maxW="sm" rounded="lg">
          <Text fontSize="6xl">Bug Out!</Text>
          <FormControl>
            <Input
              placeholder='Enter your name to play'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button onClick={async () => {
              await playAsGuestThunk(name);
              await findRandomGame();
              updatePlayerName(name);
              setName('');
            }}
            >Join Random Room
            </Button>
            <Button onClick={() => {
              playAsGuestThunk(name);
              updatePlayerName(name);
              setName('');
            }}
            >Join Private Room
            </Button>
          </FormControl>
          <Button onClick={() => {
              updatePlayerName(name)
              history.push('/create');
              }}
              >Create Game</Button>
          <Button onClick={() => history.push('/login')}>Login</Button>
        </Box>
      </div>
      <Text>How to play:</Text>
    </div>
  )
}

const mapStateToProps = ({ user, game, input }) => ({ user, game, input });

const mapDispatchToProps = (dispatch) => {
  const updatePlayerName = (value) => {
    dispatch(updateInput('playerName', value))
  }
  return {
    playAsGuestThunk, 
    findRandomGame,
    updatePlayerName,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage); 