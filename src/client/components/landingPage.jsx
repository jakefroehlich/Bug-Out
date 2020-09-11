/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Input, FormControl, Text, Box } from '@chakra-ui/core';
import { getCurrentGameThunk, findRandomGameThunk } from '../store/thunks/gameThunks';

const LandingPage = (props) => {
  const [name, setName] = useState('')
  useEffect(() => {
    props.getCurrentGame();
    console.log('process.env is ' , window.location.href);
  }, []);
  const { game } = props;

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
            <Button 
              width="200px" 
              variantColor="teal"
              variant="outline"
              margin="5px"
              onClick={async () => {
              await props.findRandomGame(game.id)
              setName('')
            }}
            >Join Random Room
            </Button>
            <Button 
              width="200px" 
              variantColor="teal"
              variant="outline"
              margin="5px"
              onClick={() => {
              props.history.push('/join')
              setName('')
            }}
            >Join Game
            </Button>
          </FormControl>
          <Button 
            width="200px" 
            variantColor="teal"
            variant="outline"
            margin="5px"
            onClick={() => props.history.push('/create')}
          >Create Game
          </Button>
          <Button 
            width="200px" 
            variantColor="teal"
            variant="outline"
            margin="5px"
            onClick={() => props.history.push('/login')}
          >Login
          </Button>
          <Button 
            width="200px" 
            variantColor="teal"
            variant="outline"
            margin="5px"
            onClick={() => props.history.push('/howtoplay')}
          >How To Play
          </Button>
        </Box>
      </div>

    </div>
  )
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = (dispatch) => {
  return {
  getCurrentGame: () => dispatch(getCurrentGameThunk()),
  findRandomGame: (currentGameId) => dispatch(findRandomGameThunk(currentGameId)),
}};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage); 
