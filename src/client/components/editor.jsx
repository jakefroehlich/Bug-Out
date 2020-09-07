import React, {useState, useRef} from 'react';
import Editor from '@monaco-editor/react';
import {Button} from "@chakra-ui/core"

const CodeEditor = ()=>{

  const [isEditorReady, setIsEditorReady] = useState(false);
  const valueGetter = useRef();

  function handleEditorDidMount(_valueGetter) {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  }

  function handleShowValue() {
    console.log(valueGetter.current());
    // const code = valueGetter.current();
  }

  return (
    <div>
      <Editor
        height="50vh"
        width='50%'
        theme='dark'
        language="javascript"
        value="// write your code here"
        editorDidMount={handleEditorDidMount}
      />
      <Button onClick={handleShowValue} disabled={!isEditorReady} type='button'>
        Run!
      </Button>
    </div>
  );
}

export default CodeEditor