import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { Button, Input, FormControl, Text, Box } from '@chakra-ui/core';
let socket;

const ChatBox = ({
    game,
    user,
    input }) => {

    // const [messages, setMessages] = useState([]);
    const [chatMsg, setChatMsg] = useState('');
    const [messages, setMessages] = useState([]);

    console.log(messages)

    useEffect(() => {
        socket = io();
        console.log(socket)
        socket.on('message', message => {
            console.log('chatbox messages', messages);
            // messages.push(message)
            setMessages([
                ...messages,
                message
            ])
        });
        // socket.on('broadcast', broadcast => {
        //     console.log('broadcast', broadcast);
        // })
        console.log('effect used')
    }, [])

    const handleChange = (e) => {
        e.preventDefault();

        setChatMsg(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        socket.emit('chatMsg', chatMsg);
    }

    return (
        <FormControl>
            <div
                id='messagebox'>
                    {messages ? messages.map(msg => {
                        return (
                            <div
                                key={msg}>
                                {/* <p>{msg.name}</p> */}
                                <p>{msg}</p>
                            </div>
                            )
                    }) : <p>No messages yet :(</p>}
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