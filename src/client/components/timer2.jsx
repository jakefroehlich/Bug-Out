/* eslint-disable no-shadow */
// import { Box, Text } from '@chakra-ui/core';
import { connect } from 'react-redux';
import React from 'react';
import FlipCountdown from '@rumess/react-flip-countdown';
import { addScore } from '../store/thunks/gameThunks';

const Timer = (props) => {

  console.log('timer!')

  return (
    <div>
      { props.game.roundEnd
        && (
          <div>
            <FlipCountdown
              hideYear
              hideMonth
              hideDay
              hideHour
              endAt={`${props.game.roundEnd}`}
            />
          </div>
        )}
    </div>
  );
}

const mapStateToProps = (props) => (props);
export default connect(mapStateToProps, { addScore })(Timer);
