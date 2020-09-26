/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { Text } from '@chakra-ui/core';
import { connect } from 'react-redux';

class GameStartTimer extends Component {
  constructor() {
    super();

    this.state = {
      seconds: 5,
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
        this.props.history.push(`/game/${this.props.game.id}`);
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
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
export default connect(mapStateToProps, null)(GameStartTimer);
