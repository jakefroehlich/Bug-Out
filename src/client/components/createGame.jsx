/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {Text, Box, Select, FormControl, FormLabel, Button } from '@chakra-ui/core';
import store from '../store/index'
import {createGameThunk, getCurrentGameThunk} from '../store/thunks/gameThunks';

const CreateGame = (props) => {
  const [rounds, setRounds] = useState('');
  const [difficulty, setDifficulty] = useState('Beginner');
  const { game } = props;

  useEffect(() => {
    props.getCurrentGame();
  }, []) 

  console.log(game)
  
  return (
    <div style={{ display:'flex', justifyContent:'center'}}>
      <div style={{display:'flex', flexDirection:'column', padding:'10px'}}>
        <Box borderWidth='1px' borderColor='black' borderStyle='solid' maxW="sm" rounded="lg" m={2} p={4}>
          <Text>{`Room Code: ${game.code}`}</Text>
        </Box>
        <Box borderWidth='1px' borderColor='black' borderStyle='solid' maxW="sm" rounded="lg" h='100%' m={2} p={4}>
          <Text>The Competition</Text>
          {game.players.map((player) => {
              return(<Text key={player.id}>{player.name ? (player.name) :'Guest' }</Text>);
          })}
        </Box>
      </div>
      <div style={{padding:'10px'}}>
        <Box w="100%" p={4} borderWidth='1px' borderColor='black' borderStyle='solid' maxW="sm" rounded="lg" m={2}>
          <Text fontSize="6xl">Settings</Text>
          <FormControl>
            <FormLabel>Difficulty:</FormLabel>
            <Select placeholder="Select Difficulty" onChange={(e)=> setDifficulty(e.target.value)}>
              <option value="Beginner" defaultValue>Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Difficult">Difficult</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Rounds:</FormLabel>
            <Select placeholder="Select No. of Rounds" onChange={(e)=> setRounds(e.target.value)}>
              <option value="1" defaultValue>1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Select>
          </FormControl>
        </Box>
        <Box w="100%" p={4} borderWidth='1px' borderColor='black' borderStyle='solid' maxW="sm" rounded="lg" m={2}>
          <Text>{`Invite Link: http://${window.location.href}/api/game/join/${game.id}`}</Text>
        </Box>
      </div>
      <div style={{margin:'60px'}}>
        <Button
          h='100%'
          onClick={()=>{
          props.createGame(rounds, difficulty)
          props.history.push('/loading-game')
        }}
        >Play!
        </Button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({ 
  game: state.game,
  user: state.user,
})
const mapDispatchToProps = (dispatch) => {
  return {
  getCurrentGame: () => dispatch(getCurrentGameThunk()),
  createGame: () => dispatch(createGameThunk(rounds, difficulty)),

}};

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame); 