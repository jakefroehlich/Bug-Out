import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Text,
} from '@chakra-ui/core';
import socket from '../utils/socket';
import { addMessage } from '../store/actions';

const ChatBox = ({ msgs, game, session }) => {
  const [chatMsg, setChatMsg] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setChatMsg(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('chatMsg', chatMsg, game.code, session.name);
    setChatMsg('');
  };

  return (
    <div
      className="messagebox"
    >
      <form
        className="messageform"
      >
        <div
          className="messages"
        >
          {msgs ? (
            msgs.map((msg) => (
              <div key={msg.id}>
                <span>
                  {msg.playerName}: {msg.text} @{msg.time}
                </span>
              </div>
            ))
          ) : (
            <Text>No messages yet :(</Text>
          )}
        </div>
        <div
          className="messageinput"
        >
          <input
            id="msg"
            type="text"
            placeholder="type something, n00b"
            onChange={handleChange}
            value={chatMsg}
          />
          <button type="submit" onClick={handleSubmit}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({
  game,
  user,
  input,
  messages,
  session,
}) => {
  const msgs = messages;
  return {
    game,
    user,
    input,
    msgs,
    session,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addMsg: (msg) => dispatch(addMessage(msg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
