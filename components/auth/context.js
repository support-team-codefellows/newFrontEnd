import React from "react";
import cookie from "react-cookies";
import jwt from "jsonwebtoken";
import axios from "axios";

export const LoginContext = React.createContext();

class LoginProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      can: this.can,
      login: this.login,
      logout: this.logout,
      user: {email:'', username:'', capabilities: [] },
    };
  }

  can = (capability) => {
    console.log('hello',this.state.user, capability);
    return this.state.user?.capabilities?.includes(capability);
  };

  login = async (email, password ,username=this.state.user.username) => {
    try {
      const encodedBase64Token = Buffer.from(`${email}:${password}`).toString(
        "base64"
      );
      const authorization = `Basic ${encodedBase64Token}`;
      let data = "";
      let config = {
        method: "post",
        url: "https://project401.herokuapp.com/sign-in",
        headers: {
          Authorization: authorization,
        },
        data: data,
      };

      const response = await axios(config);

      this.setState({
        token: response.data.token,
        loggedIn: true,
        user: { email: response.data.email, username: username.username},
        capabilities: response.data.capabilities 
        
      })
      this.validateToken(response.data.token);
    } catch (error) {
      console.log(error.message);
    }
  };

  logout = () => {
    this.setLoginState(false, null, {},null);
  };

  validateToken = (token) => {
    try {
      console.log(this.state.user.username)
      let un= this.state.user.username;
      let user = jwt.verify(token, process.env.REACT_APP_SECRET || "secret");
      this.setLoginState(true, token, user,un);
      
    } catch (e) {
      this.setLoginState(false, null, {}, null);
      console.log("Token Validation Error", e);
    }
  };
  setLoginState = (loggedIn, token, user, username) => {
    cookie.save("auth", token);
   console.log("something", user);
    this.setState({ token, loggedIn, user, username });
    let n= username;
    console.log(n)
    return user
  };

  componentDidMount() {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load("auth");
    const token = qs.get("token") || cookieToken || null;
    this.validateToken(token);
  }

  render() {
    return (
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}

export default LoginProvider;
