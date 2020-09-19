/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { Box, Text } from '@chakra-ui/core';
import { connect } from 'react-redux';
import { addScore } from '../store/thunks/gameThunks';

const Timer = () => {

return (
  <div>
    
  </div>
)
  
}

const mapStateToProps = (props) => (props);
export default connect(mapStateToProps, { addScore })(Timer);
