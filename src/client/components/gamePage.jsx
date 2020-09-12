import React from 'react';
import { connect } from 'react-redux';
import Editor from './editor';
import { Button, Text, Box } from "@chakra-ui/core";

const GamePage = (props)=>{
  
  return (
    <div style={{display:'flex'}}>
      <Editor />
    </div>
  );
}

const mapStateToProps = (props) => (props);
export default connect(mapStateToProps, null)(GamePage)