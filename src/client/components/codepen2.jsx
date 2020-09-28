/* eslint-disable no-plusplus */
/* eslint-disable no-alert */
// import { test } from '../../server/utils/tests';
import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import Editor from '@monaco-editor/react';
// import { Button, Text, Box } from '@chakra-ui/core';
import moment from 'moment';
// import { buildFunction } from '../../server/utils/buildFunction';
import { addScore, setCorrect } from '../store/thunks';

const CodeEditor2 = ({ game, match, setCorrect, addScore }) => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [code, setCode] = useState('')

  const splitcode = code.replace(/\n/ig, '').split("").filter(char => char !== " ")


  console.log('code', splitcode)

  const { prompt } = game;

  function handleShowValue() {
    // const fn = buildFunction(valueGetter.current());
    // const ts = `test${prompt.id}`;
    // const correct = test[ts](fn);
    // const correct = true;
    // if (correct) {
    //   setCorrect(match.params.id);
    //   const finishTime = moment().unix();
    //   const userScore = game.roundEndUnix - finishTime;
    //   addScore(userScore);
    // } else {
    //   alert('Sorry try again :(');
    // }
  
  }

  function handleChange(e) {
    setCode(e.target.innerText)
  }

  return (
    <div
      className="codeEditor"
    >
      <div 
        className="codeScreen"
        contentEditable={true}
        onKeyUp={handleChange}
        >
      </div>
      <button onClick={handleShowValue} type="button">
          Check Function
        </button>
      {/* {props.input.correctAnswer
      && (
      <div style={{ textAlign: 'center' }}>
        <Text color="#2df50a" fontSize="3rem" marginTop="1rem" marginBottom="0">Correct!!!</Text>
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
    </div> */}
    </div>
  );
};

const mapStateToProps = (props) => (props);
export default connect(mapStateToProps, { setCorrect, addScore })(CodeEditor2);
