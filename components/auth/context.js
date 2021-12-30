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
      user: { capabilities: [] },
    };
  }

  can = (capability) => {
    return this.state.user?.capabilities?.includes(capability);
  };

  login = async (username, password) => {
    try {
      const encodedBase64Token = Buffer.from(
        `${username}:${password}`
      ).toString("base64");
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
        user: response.data.username,
        capabilities: response.data.capabilities,
      });

      console.log(response.data.token)
      this.validateToken(response.data.token);
    } catch (error) {
      console.log(error.message);
    }
  };

  logout = () => {
    this.setLoginState(false, null, {});
  };

  validateToken = (token) => {
    try {
      let user = jwt.verify(token, process.env.REACT_APP_SECRET||"secret");
      this.setLoginState(true, token, user);
    } catch (e) {
      this.setLoginState(false, null, {});
      console.log("Token Validation Error", e);
    }
  };

  setLoginState = (loggedIn, token, user) => {
    cookie.save("auth", token);
    this.setState({ token, loggedIn, user });
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
