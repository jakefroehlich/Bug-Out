import React, {useState, useRef, useEffect} from 'react';
import { connect } from 'react-redux';
import Editor from '@monaco-editor/react';
import { Button, Text, Box } from "@chakra-ui/core";
import { buildFunction } from '../../server/utils/buildFunction';
import { test } from '../../server/utils/tests';
import { getPromptThunk } from '../store/thunks/gameThunks';

const CodeEditor = (props)=>{
  
  useEffect(()=>{
    props.getPromptThunk('easy')
  }, [])

  const [isEditorReady, setIsEditorReady] = useState(false);
  const valueGetter = useRef();

  function handleEditorDidMount(_valueGetter) {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  }

  function handleShowValue() {
    const fn = buildFunction(valueGetter.current());
    const ts = `test${props.game.prompt.id}`
    console.log(test[ts](fn))
  }

  console.log(props)
  return (
    <div>
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', width:'50%', margin:'15px'}}>
        <Box w='100%' bg='#4287f5' color='white' borderWidth='1px' borderColor='darkBlue' borderStyle='solid' rounded="lg" m={2} p={4}>
          <Text fontSize="lg" w='100%'>{props.game.prompt.name}</Text>
          <Text fontSize="sm" w='100%'>{props.game.prompt.prompt}</Text>
        </Box>
        <div style={{width: '100%'}}>
          <Editor
            height="50vh"
            width='100%'
            theme='dark'
            language="javascript"
            value="function bugout () { 
            /*  Your code here  */
            }"
            editorDidMount={handleEditorDidMount}
          />
        </div>
        <Button onClick={handleShowValue} disabled={!isEditorReady} type='button' m={1}>
          Check Function
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (props) => (props);
export default connect(mapStateToProps, {getPromptThunk})(CodeEditor)