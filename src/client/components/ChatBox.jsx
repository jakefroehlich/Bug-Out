import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Button, Input, FormControl, Text,
} from '@chakra-ui/core';
import socket from '../utils/socket';
import { addMessage } from '../store/actions';

const ChatBox = ({ msgs, addMsg }) => {
  const [chatMsg, setChatMsg] = useState('');

  console.log('render', msgs);

  useEffect(() => {
    socket.on('message', (message) => {
      addMsg(message);
    });
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setChatMsg(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('chatMsg', chatMsg);
    setChatMsg('');
  };

  return (
    <FormControl display="flex" flexDirection="column" h="100%">
      <div id="messagebox" style={{ height: '90%', overflow: 'scroll', maxHeight: '400px' }}>
        {msgs ? (
          msgs.map((msg) => (
            <div key={msg.id}>
              <Text>
                {msg.playerName}: {msg.text} @{msg.time}
              </Text>
            </div>
          ))
        ) : (
          <Text>No messages yet :(</Text>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Input
          id="msg"
          type="text"
          placeholder="type something, n00b"
          onChange={handleChange}
          value={chatMsg}
        />
        <Button type="submit" onClick={handleSubmit} variantColor="purple">Send</Button>
      </div>
    </FormControl>
  );
};

const mapStateToProps = ({
  game, user, input, messages,
}) => {
  const msgs = messages;
  return {
    game,
    user,
    input,
    msgs,
  };
};

const mapDispatchToProps = (dispatch) => ({ addMsg: (msg) => dispatch(addMessage(msg)) });

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
