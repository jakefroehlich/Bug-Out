/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {useState} from 'react';
import { connect } from 'react-redux';
import {Text, Box, Select, FormControl, FormLabel, Button } from '@chakra-ui/core';
import {createGameThunk} from '../store/thunks/gameThunks';

const CreateGame = (props) => {

  const [rounds, setRounds] = useState('')

  return (
    <div style={{ display:'flex', justifyContent:'center'}}>
      <div style={{display:'flex', flexDirection:'column', padding:'10px'}}>
        <Box borderWidth='1px' borderColor='black' borderStyle='solid' maxW="sm" rounded="lg" m={2} p={4}>
          <Text>Room Code: TBD</Text>
        </Box>
        <Box borderWidth='1px' borderColor='black' borderStyle='solid' maxW="sm" rounded="lg" h='100%' m={2} p={4}>
          <Text>The Competition</Text>
        </Box>
      </div>
      <div style={{padding:'10px'}}>
        <Box w="100%" p={4} borderWidth='1px' borderColor='black' borderStyle='solid' maxW="sm" rounded="lg" m={2}>
          <Text fontSize="6xl">Settings</Text>
          <FormControl>
            <FormLabel>Rounds:</FormLabel>
            <Select placeholder="Select rounds" onChange={(e)=> setRounds(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Select>
          </FormControl>
        </Box>
        <Box w="100%" p={4} borderWidth='1px' borderColor='black' borderStyle='solid' maxW="sm" rounded="lg" m={2}>
          <Text>Invite Link: http://...............</Text>
        </Box>
      </div>
      <div style={{margin:'60px'}}>
        <Button h='100%' onClick={()=>props.createGameThunk(rounds)}>Play!</Button>
      </div>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, {createGameThunk})(CreateGame); 