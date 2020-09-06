/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Input, FormControl, Text, Box } from '@chakra-ui/core';
import { playAsGuestThunk, findRandomGame } from '../store/thunks/gameThunks';

const LandingPage = (props) => {
  const [name, setName] = useState('')

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
              await props.playAsGuestThunk(name)
              await props.findRandomGame()
              setName('')
            }}
            >Join Random Room
            </Button>
            <Button onClick={() => {
              props.playAsGuestThunk(name)
              setName('')
            }}
            >Join Private Room
            </Button>
          </FormControl>
          <Button onClick={() => props.history.push('/create')}>Create Game</Button>
          <Button onClick={() => props.history.push('/login')}>Login</Button>
        </Box>
      </div>
      <Text>How to play:</Text>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, {playAsGuestThunk, findRandomGame})(LandingPage); 