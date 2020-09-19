/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { Box, Text } from '@chakra-ui/core';
import { connect } from 'react-redux';

class StartTimer extends Component {
  constructor() {
    super();

    this.state = {
      seconds: 0,
    };
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { seconds } = this.state;

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
      }
      if (seconds === 0) {
        clearInterval(this.myInterval);
      }
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    const { seconds } = this.state;
    return (
      <Box bg="#15c912" h="10vh" display="flex" justifyContent="center" alignItems="center" w="90%" m={3} p={4} color="white" borderWidth="3px" borderColor="#1d7a1b" borderStyle="solid" rounded="lg">
        { seconds > 10
          && <Text fontSize={70}>{seconds < 10 ? `0${seconds}` : seconds}</Text>}
        { seconds <= 10
          && <Text color="red" fontSize={70}>{seconds < 10 ? `0${seconds}` : seconds}</Text>}
      </Box>
    );
  }
}

const mapStateToProps = (props) => (props);
export default connect(mapStateToProps, null)(StartTimer);
