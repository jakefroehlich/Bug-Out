/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { Box, Text } from '@chakra-ui/core';

export default class Timer extends Component {
  constructor() {
    super();

    this.state = {
      minutes: 10,
      seconds: 0,
    };
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state;

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval);
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    const { minutes, seconds } = this.state;
    return (

      <Box bg="#15c912" h="10vh" display="flex" justifyContent="center" alignItems="center" w="90%" m={3} p={4} color="white" borderWidth="3px" borderColor="#1d7a1b" borderStyle="solid" rounded="lg">
        { minutes === 0 && seconds === 0
          ? <Text>Times Up!</Text>
          : <Text fontSize={70}>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Text>}
      </Box>
    );
  }
}
