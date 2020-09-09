import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client';

const ChatBox = ({
    game, 
    user,
    input,
    dispatch}) => {
    
    const socket = io();

    socket.on('message', message => {
        console.log('message', message)
    })
    return (
        <div>
            Hello Chad
        </div>
    )
}

const mapStateToProps = ({game, user, input}) => {
    return {
        game,
        user,
        input
    }
}

const mapDispatchToProps = (dispatch) => {
    return dispatch;
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);