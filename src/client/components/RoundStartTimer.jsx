/* eslint-disable max-len */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { Text } from '@chakra-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  setRoundTimesThunk, getPromptThunk, setSessionThunk, roundReset,
} from '../store/thunks';

class RoundStartTimer extends Component {
  constructor() {
    super();

    this.state = {
      seconds: 5,
    };
    this.startNewRound = this.startNewRound.bind(this);
  }

  // resets the round clock, gets a new prompt, and sets all users correctAnswer back to false
  componentDidMount() {
    setSessionThunk();
    if (this.props.session.host) {
      this.props.setRoundTimesThunk(this.props.match.params.id);
      this.props.getPromptThunk(this.props.game.difficulty, this.props.match.params.id);
      this.props.roundReset(this.props.game.id);
    }

    if (this.props.game.rounds > 1) {
      this.myInterval = setInterval(() => {
        const { seconds } = this.state;

        if (seconds > 0) {
          this.setState(({ seconds }) => ({
            seconds: seconds - 1,
          }));
        }
        if (seconds === 0) {
          this.startNewRound();
        }
      }, 1000);
    } else {
      axios.post('/game/leaderboard');
      this.props.history.push('/game-over');
    }
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  async startNewRound() {
    await clearInterval(this.myInterval);
    await window.location.reload(true);
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>
        { seconds === 0
          ? <Text>Lets Play!</Text>
          : <Text fontSize={70}>{seconds}</Text>}
      </div>
    );
  }
}

const mapStateToProps = (props) => (props);
export default connect(mapStateToProps, {
  setRoundTimesThunk, getPromptThunk, setSessionThunk, roundReset,
})(RoundStartTimer);
