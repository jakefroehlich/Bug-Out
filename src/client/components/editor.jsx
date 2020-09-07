import React from 'react';
import AceEditor from 'react-ace';

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

const CodeEditor = ()=>{
  function onChange(newValue) {
    console.log("change", newValue);
  }

  return(
    <div>
      <AceEditor
        mode="javascript"
        theme="monokai"
        onChange={onChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true
        }}
      />
    </div>
  )
}

export default CodeEditor