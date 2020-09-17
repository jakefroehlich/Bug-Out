import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box } from '@chakra-ui/core';
import Editor from './editor';
import ChatBox from './ChatBox';
import Timer from './timer';
import { getPowerUpsThunk } from '../store/thunks/gameThunks';

const GamePage = (props) => {
  useEffect(() => {
    props.getPowerUpsThunk();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ height: '80vh' }}>
        <Box bg="tomato" h="40%" w="110px" m={3} p={4} color="white" borderWidth="3px" borderColor="#c90c0c" borderStyle="solid" rounded="lg">
          Competition
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
      </div>
    </div>
  );
};
const mapStateToProps = (props) => (props);
export default connect(mapStateToProps, { getPowerUpsThunk })(GamePage);
