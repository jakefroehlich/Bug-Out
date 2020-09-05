/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { connect } from 'react-redux';
import {Text, Box } from '@chakra-ui/core';

const CreateGame = () => {

  return (
    <div style={{textAlign:'center', display:'flex', justifyContent:'center'}}>
      <Box w="100%" p={4} borderWidth='1px' borderColor='black' borderStyle='solid' maxW="sm" rounded="lg">
        <Text fontSize="6xl">Settings</Text>
      </Box>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, null)(CreateGame); 