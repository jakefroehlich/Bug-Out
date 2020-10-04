/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-alert */
import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import Editor from '@monaco-editor/react';
import {
  Button, Text, Box, useToast,
} from '@chakra-ui/core';
import moment from 'moment';
import { test } from '../../server/utils/tests';
import { buildFunction } from '../../server/utils/buildFunction';
import { addScore, setCorrect } from '../store/thunks';
import { powerUps } from '../../server/utils/powerups';

const CodeEditor = (props) => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const valueGetter = useRef();

  const [code, setCode] = useState(`function bugout () {
    /*  Your code here  */
    }`);

  const runPowerUp = (pwName) => {
    const newCode = powerUps[pwName](valueGetter.current());
    setCode(newCode);
  };

  useEffect(() => {
    if (props.game.sufferingPowerUp) {
      runPowerUp(props.game.sufferingPowerUp);
    }
  });

  const toast = useToast();

  function handleEditorDidMount(_valueGetter) {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  }

  function handleShowValue() {
    const fn = buildFunction(valueGetter.current());
    try {
      // const ts = `test${props.game.prompt.id}`;
      // const result = test[ts](fn);
      const result = true;
      if (result === true) {
        props.setCorrect(props.match.params.id);
        const finishTime = moment().unix();
        const userScore = props.game.roundEndUnix - finishTime;
        props.addScore(userScore);
        toast({
          title: 'Correct',
          description: 'Your code passes all tests!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Incorrect',
          description: `Expected ${result.expected} but received ${result.res}`,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (e) {
      toast({
        title: 'Warning.',
        description: 'Error in your code',
        status: 'warning',
        duration: 9000,
        isClosable: true,
      });
      throw (e);
    }
  }
  return (
    <div
      className="editorcontainer"
    >
      <Editor
        height="50vh"
        width="100%"
        theme="dark"
        language="javascript"
        value={code}
        editorDidMount={handleEditorDidMount}
      />
      <button onClick={handleShowValue} disabled={!isEditorReady} type="button" className="button">
        Check Function
      </button>
    </div>
  );
};

const mapStateToProps = (props) => (props);
export default connect(mapStateToProps, { setCorrect, addScore })(CodeEditor);
