/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { Text } from '@chakra-ui/core';
import { connect } from 'react-redux';
import { setRoundTimes, getPromptThunk } from '../store/thunks/gameThunks';

class RoundStartTimer extends Component {
  constructor() {
    super();

    this.state = {
      seconds: 5,
    };
    this.startNewRound = this.startNewRound.bind(this);
  }

  componentDidMount() {
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
      this.props.history.push('/game-over');
    }
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  async startNewRound() {
    await clearInterval(this.myInterval);
    await this.props.setRoundTimes(this.props.match.params.id);
    await this.props.getPromptThunk(this.props.game.difficulty, this.props.match.params.id);
    await window.location.reload(true);
  }

  render() {
    console.log(this.props);
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
export default connect(mapStateToProps, { setRoundTimes, getPromptThunk })(RoundStartTimer);
