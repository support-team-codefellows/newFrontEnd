import React, { Component } from "react";
import { FormErrors } from "./helper/auth/errorForm";
import axios from "axios";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      email: "",
      password: "",
      formErrors: { email: "", password: "" },
      emailValid: false,
      passwordValid: false,
      formValid: false,
    };
  }
  handleSubmit = async (e) => {
    e.preventDefault();

    let username = this.state.email;
    let password = this.state.password;
    let lastname = e.target.name.value;

    let url = "https://tangled-backend.herokuapp.com/signup";
    let obj = { username, password, lastname };
    await axios
      .post(url, obj)
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleUserInput = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? "" : " is too short";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid,
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid,
    });
  }
  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }

  render() {
    return (
      <>
       <FormErrors formErrors={this.state.formErrors} />
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="">Username</label>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Username"
        />

        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.email
          )}`}
        >
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            required
            className="form-control"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleUserInput}
          />
        </div>
        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.password
          )}`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleUserInput}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!this.state.formValid}
        >
          Sign up
        </button>
      </form>
      </>
    );
  }
}
export default Signup;
