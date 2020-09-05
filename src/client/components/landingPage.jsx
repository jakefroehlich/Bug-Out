/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Input, FormControl, Text, Box } from '@chakra-ui/core';

const LandingPage = () => {
  const [name, setName] = useState('')

  return (
    <div style={{textAlign:'center', display:'flex', justifyContent:'center'}}>
      <Box w="100%" p={4} borderWidth='1px' borderColor='black' borderStyle='solid' maxW="sm" rounded="lg">
        <Text fontSize="6xl">Bug Out!</Text>
        <Text fontSize="md">Explanations</Text>
        <FormControl>
          <Input
            placeholder='Enter your name to play'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={() => null}>Join Game</Button>
        </FormControl>
      </Box>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, null)(LandingPage); 