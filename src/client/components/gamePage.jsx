import React from 'react';
import { connect } from 'react-redux';
import { Box } from '@chakra-ui/core';
import Editor from './editor';
import ChatBox from './ChatBox';

const GamePage = () => (
<<<<<<< HEAD
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <div>
      <Box
        bg="tomato"
        h="80vh"
        w="110px"
        m={3}
        p={4}
        color="white"
        borderWidth="3px"
        borderColor="#c90c0c"
        borderStyle="solid"
        rounded="lg"
      >
=======
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div style={{ height: '80vh' }}>
      <Box bg="tomato" h="40%" w="110px" m={3} p={4} color="white" borderWidth="3px" borderColor="#c90c0c" borderStyle="solid" rounded="lg">
>>>>>>> 2de9aa1b282e5a61d2ba95c84560795107b51fc9
        Competition
      </Box>
      <Box bg="#fabc41" h="60%" w="110px" m={3} p={4} color="white" borderWidth="3px" borderColor="#d49619" borderStyle="solid" rounded="lg">
        Power Ups
      </Box>
    </div>
    <Editor />
    <div>
<<<<<<< HEAD
      <Box
        bg="#15c912"
        h="10vh"
        w="110px"
        m={3}
        p={4}
        color="white"
        borderWidth="3px"
        borderColor="#1d7a1b"
        borderStyle="solid"
        rounded="lg"
      >
        Time:
      </Box>
      <Box
        bg="#fabc41"
        h="60vh"
        w="110px"
        m={3}
        p={4}
        color="white"
        borderWidth="3px"
        borderColor="#d49619"
        borderStyle="solid"
        rounded="lg"
      >
        Power Ups
=======
      <Box bg="#15c912" h="10vh" w="90%" m={3} p={4} color="white" borderWidth="3px" borderColor="#1d7a1b" borderStyle="solid" rounded="lg">
        Time:
      </Box>
      <Box bg="black" height="75%" w="90%" color="white" m="15px" p={3} borderWidth="3px" borderStyle="solid" borderColor="#331566" rounded="lg">
        <ChatBox />
>>>>>>> 2de9aa1b282e5a61d2ba95c84560795107b51fc9
      </Box>
    </div>
  </div>
);

const mapStateToProps = (props) => props;
export default connect(mapStateToProps, null)(GamePage);
