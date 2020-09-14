import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@chakra-ui/core';
import { buildFunction } from '../../server/utils/buildFunction';
import { test } from '../../server/utils/tests';

const CodeEditor = () => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const valueGetter = useRef();

  function handleEditorDidMount(_valueGetter) {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  }

  function handleShowValue() {
    const fn = buildFunction(valueGetter.current());
    console.log(test.test59cfc000aeb2844d16000075(fn));
  }

  return (
    <div>
      <Editor
        height="50vh"
        width="50%"
        theme="dark"
        language="javascript"
        value="function () {
        /*  Your code here  */
        }"
        editorDidMount={handleEditorDidMount}
      />
      <Button onClick={handleShowValue} disabled={!isEditorReady} type="button">
        Run!
      </Button>
    </div>
  );
};

export default CodeEditor;
