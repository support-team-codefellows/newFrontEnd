import React from 'react';
import {When} from 'react-if';

import { LoginContext } from './context.js';

class Login extends React.Component {

  static contextType = LoginContext;

  componentDidMount() {
  console.log("t3st",LoginContext);

  }
  render() {
    { 
    }
    const isLoggedIn = this.context.loggedIn;
    const canDo = this.props.capabilities ? this.context.can(this.props.capabilities) : true;
    console.log("t3st",this.props.capabilities);
    const okToRender = isLoggedIn && canDo;

    return (
      <When condition={okToRender}>
        {this.props.children}
      </When>
    );
  }
}

// capabilities
export default Login;
