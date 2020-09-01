import React, { Component } from 'react';
import { connect } from 'react-redux';
import { whoami } from '../store/thunks/loginThunks';


class LoggedIn extends Component{
 
  async componentDidMount(){
    await this.props.whoami();
  }

  render(){
    console.log(this.props.user)
    const { loggedIn } = this.props.user;
    return(
      <div>
        <h3>{loggedIn ? 'You are logged in.' : 'Failed to login.'}</h3>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = (dispatch) => ({
  whoami: () => dispatch(whoami()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoggedIn);