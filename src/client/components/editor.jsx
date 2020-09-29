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
import store from '../store/index';

const CodeEditor = (props) => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const valueGetter = useRef();

  const [code, setCode] = useState(`function bugout () {
    /*  Your code here  */
    }`);

  const runPowerUp = (pwName) => {
    powerUps[pwName]();
  };

  // add store variable
  useEffect(() => {
    if (store.getState().game.sufferingPowerUp) {
      runPowerUp(store.getState().game.sufferingPowerUp);
    }
  }, store.getState().game.sufferingPowerUp);

  const { prompt } = props.game;
  const toast = useToast();

  function handleEditorDidMount(_valueGetter) {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  }

  function handleShowValue() {
    const fn = buildFunction(valueGetter.current());
    // const ts = `test${prompt.id}`;
    // const correct = test[ts](fn);
    console.log(valueGetter.current());
    const correct = true;
    if (correct) {
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
        description: 'Your code failed at least 1 test case.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '50%',
        margin: '15px',
      }}
    >
      <Box
        w="100%"
        bg="#00c3d9"
        color="white"
        borderWidth="3px"
        borderColor="#3674b5"
        borderStyle="solid"
        rounded="lg"
        m={2}
        p={4}
        maxHeight="150px"
        overflow="scroll"
      >
        <Text fontSize="lg" w="100%">
          {prompt.name}
        </Text>
        <Text fontSize="sm" w="100%">
          {prompt.prompt}
        </Text>
      </Box>
      <div style={{ width: '100%' }}>
        <Editor
          height="50vh"
          width="100%"
          theme="dark"
          language="javascript"
          value={code}
          editorDidMount={handleEditorDidMount}
        />
      </div>
      {props.input.correctAnswer
      && (
      <div style={{ textAlign: 'center' }}>
        {props.input.score === 0
          && <Text color="#2df50a" marginTop="0">Calculating Score...</Text>}
        {props.input.score > 0
          && <Text color="#2df50a" marginTop="0">You earned {props.input.score} points!</Text>}
        <Text color="#2df50a" marginTop="0">Feel free to keep bugging the competition while you wait.</Text>
      </div>
      )}
      {!props.input.correctAnswer
        && (
        <Button onClick={handleShowValue} disabled={!isEditorReady} type="button" m={1} variantColor="teal" variant="outline" w="100%" marginTop={5}>
          Check Function
        </Button>
        )}
    </div>
  );
};

const mapStateToProps = (props) => (props);
export default connect(mapStateToProps, { setCorrect, addScore })(CodeEditor);
