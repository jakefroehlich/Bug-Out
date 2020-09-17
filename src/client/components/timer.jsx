/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { Box, Text } from '@chakra-ui/core';
import { connect } from 'react-redux';
import { addScore } from '../store/thunks/gameThunks';

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      minutes: 10,
      seconds: 0,
      score: 0,
      scoreUpdated: false,
    };
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state;

      if (this.props.input.correctAnswer && !this.state.scoreUpdated) {
        this.setState({ score: (minutes * 100) + seconds, scoreUpdated: true });
      }

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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.score < this.state.score) {
      this.props.addScore(this.state.score);
    }
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

const mapStateToProps = (props) => (props);
export default connect(mapStateToProps, { addScore })(Timer);
