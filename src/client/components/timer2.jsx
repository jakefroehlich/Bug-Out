/* eslint-disable no-shadow */
import { connect } from 'react-redux';
import React from 'react';
import FlipCountdown from '@rumess/react-flip-countdown';

const Timer = (props) => {
  console.log(props.game.roundEnd);
  return (
    <div className="timer">
      { props.game.roundEnd
      && (
        <div
          className="box innertimer">
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
};

const mapStateToProps = (props) => (props);
export default connect(mapStateToProps)(Timer);
