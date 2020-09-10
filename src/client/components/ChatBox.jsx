import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { Button, Input, FormControl, Text, Box } from '@chakra-ui/core';

const ChatBox = ({
    game,
    user,
    input }) => {

    // const [messages, setMessages] = useState([]);
    const [chatMsg, setChatMsg] = useState('');
    const [messageCount, setMessageCount] = useState(0);

    const socket = io();

    useEffect(() => {
        socket.on('message', message => {
            console.log('message', message)
        });
    }, [messageCount])

    const handleChange = (e) => {
        e.preventDefault();

        setChatMsg(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(chatMsg)
        socket.emit('chatMsg', chatMsg);
    }

    return (
        <FormControl>
            <div
                id='messagebox'>
            </div>
            <Input
                id='msg'
                type='text'
                placeholder='type something, n00b'
                onChange={handleChange}
            >
            </Input>
            <Button
                type='submit'
                onClick={handleSubmit}>
            </Button>
        </FormControl>
    )
}

const mapStateToProps = ({ game, user, input }) => {
    return {
        game,
        user,
        input
    };
};

const mapDispatchToProps = (dispatch) => {
    return { dispatch };
};

export default connect(mapStateToProps, null)(ChatBox);