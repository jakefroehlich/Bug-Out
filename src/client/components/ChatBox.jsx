import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Button, Input, FormControl,
} from '@chakra-ui/core';
import socket from '../utils/socket';
import { addMessage } from '../store/actions';

const ChatBox = ({ msgs, addMsg, game }) => {
  const [chatMsg, setChatMsg] = useState('');

  console.log('render', msgs);

  const handleChange = (e) => {
    e.preventDefault();
    setChatMsg(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('chatMsg', chatMsg, game.code);
  };

  return (
    <FormControl display="flex" flexDirection="column" h="100%">
      <div id="messagebox" style={{ height: '90%' }}>
        {msgs ? (
          msgs.map((msg) => (
            <div key={msg.id}>
              <p>
                {msg.playerName}: {msg.text} @{msg.time}
              </p>
            </div>
          ))
        ) : (
          <p>No messages yet :(</p>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Input
          id="msg"
          type="text"
          placeholder="type something, n00b"
          onChange={handleChange}
        />
        <Button type="submit" onClick={handleSubmit} variantColor="purple">Send</Button>
      </div>
    </FormControl>
  );
};

const mapStateToProps = ({
  game,
  user,
  input,
  messages,
}) => {
  const msgs = messages;
  return {
    game,
    user,
    input,
    msgs,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addMsg: (msg) => dispatch(addMessage(msg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
