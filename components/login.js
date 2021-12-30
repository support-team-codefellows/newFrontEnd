import React from "react";
import { When } from "react-if";
import superagent  from "superagent";
import { LoginContext } from "./helper/auth/context.js";
import base64 from "base-64";

class Login extends React.Component {
  static contextType = LoginContext;
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    let API = "https://project401.herokuapp.com";
    console.log(this.state.password);
    const response = await superagent 
    .post(`${API}/sign-in`)
    .set('authorization', `Basic ${base64.encode(`${this.state.username}:${this.state.password}`)}`);
      if (response.status === 200) {
        this.context.login(this.state.username, this.state.password);
        console.log(response.body,'response');

      }
   };

  render() {
    return (
      <>
        <When condition={this.context.loggedIn}>
          <button className="btn btn-primary" onClick={this.context.logout}>
            Log Out
          </button>
        </When>

        <When condition={!this.context.loggedIn}>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="UserName"
              name="username"
              onChange={this.handleChange}
            />
            <input
              placeholder="password"
              name="password"
              onChange={this.handleChange}
            />
            <button className="btn btn-primary">Log in</button>
          </form>
        </When>
      </>
    );
  }
}

export default Login;
