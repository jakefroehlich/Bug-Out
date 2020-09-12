import React from 'react';
import { connect } from 'react-redux';
import Editor from './editor';

const GamePage = ()=>{
  
  return (
    <div style={{display:'flex'}}>
      <Editor />
    </div>
  );
}

const mapStateToProps = (props) => (props);
export default connect(mapStateToProps, null)(GamePage)