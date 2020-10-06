import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Text,
} from '@chakra-ui/core';
import socket from '../utils/socket';
import { addMessage } from '../store/actions';

const ChatBox = ({ msgs, session, game }) => {
  const [chatMsg, setChatMsg] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setChatMsg(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (chatMsg !== '') {
      socket.emit('chatMsg', chatMsg, session.name, game.id);
      setChatMsg('');
    }
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
                <span className="messagespan">
                  {msg.playerName}: {msg.text}
                  <div>
                    @{msg.time}
                  </div>
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
            className="input"
          />
          <button type="submit" onClick={handleSubmit} className="button">
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
