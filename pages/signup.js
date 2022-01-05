import React, { Component } from "react";
import { FormErrors } from "..//components//auth///errorForm";
import axios from "axios";
import { When } from "react-if";
import { LoginContext } from "..//components//auth///context";
import Swal from 'sweetalert2';
import Auth from "..//components//auth///auth";
import Router from 'next/router';
import Profile from './Profile';

import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  Select,
} from "@chakra-ui/react";
class Signup extends Component {
  static contextType = LoginContext;
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
      name: "",
      role: "",
      image: ""
    };
  }

  imageUpload = (e) => {
    const file = e.target.files[0];
    getBase64(file).then(base64 => {
      localStorage["fileBase64"] = base64;
      console.debug("file stored", base64);
    });
  };

  handleSubmit = async (e) => {
    console.log();
    e.preventDefault();
    let email = this.state.email;
    let password = this.state.password;
    let username = this.state.name;
    let role = this.state.role;
    console.log(role);
    //https://project401.herokuapp.com/signup
    let url = "https://project401.herokuapp.com/signup";
    let obj = { email, password, username, role };
    window.localStorage.setItem('image', JSON.stringify(this.state.image));
    window.localStorage.setItem('test', this.state.image);

    console.log(obj);
    await axios
      .post(url, obj)
      .then((result) => {
        console.log(result.data);
        console.log('here is the status',);
        if (result.status === 201) {
          Swal.fire({
            position: 'centered',
            icon: 'success',
            title: 'Your Account Created Successfully',
            showConfirmButton: false,
            timer: 1500
          })
          Router.push('/login')

        }
      })
      .catch((err) => {
        console.log(err);
      });

  };

  handleUserInput = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ ...this.state, [name]: value }, () => {
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
        passwordValid = value.length >= 8;
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
        <When condition={!this.context.loggedIn}>
          <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
            <Flex p={8} flex={1} align={"center"} justify={"center"}>
              <Stack spacing={4} w={"full"} maxW={"md"}>
                <Heading fontSize={"2xl"}>Create your account</Heading>
                <FormControl id="name">
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Username"
                    value={this.state.name}
                    onChange={this.handleUserInput}
                  />
                </FormControl>
                <div
                  className={`form-group ${this.errorClass(
                    this.state.formErrors.email
                  )}`}
                >
                  <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      required
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleUserInput}
                    />
                  </FormControl>
                </div>
                <div
                  className={`form-group ${this.errorClass(
                    this.state.formErrors.password
                  )}`}
                >
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handleUserInput}
                    />
                  </FormControl>
                </div>
                <FormControl id="fileUpload">
                  <FormLabel>
                    <Button colorScheme='white'variant='ghost'>
                      <div class="button-wrapper">
                        <span class="label">
                          Upload Image
                        </span>
                        <input
                          type="file"
                          aria-label="File browser example"
                          id="upload"
                          name='imageFile'
                          onChange={this.imageUpload}
                          className="upload-box"
                        >
                        </input>


                      </div>

                      <span class="file-custom"></span>
                    </Button>
                  </FormLabel>
                </FormControl>
                {/* <Auth capabilities={'delete'}> */}
                <Stack spacing={6}>
                  <FormControl id="role">
                    <FormLabel>Role</FormLabel>
                    <Select
                      name="role"
                      placeholder="Select the your role"
                      onChange={this.handleUserInput}
                      value={this.state.role}
                    >
                      <option value="manager">manager</option>
                      <option value="employee">employee</option>
                      <option value="client">client</option>
                    </Select>
                  </FormControl>
                </Stack>
                {/* </Auth> */}
                <Stack spacing={6}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <Box>

                      <Link color="blue.500" href="/login">
                        Login
                      </Link>
                    </Box>
                    <Link color={"blue.500"}>Forgot password?</Link>
                  </Stack>
                  <Button
                    colorScheme={"blue"}
                    variant={"solid"}
                    onClick={this.handleSubmit}
                    type="submit"
                    disabled={!this.state.formValid}
                  >
                    Sign up
                  </Button>
                </Stack>
              </Stack>
            </Flex>
            <Flex flex={1}>
              <Image
                alt={"Login Image"}
                objectFit={"cover"}
                src={
                  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
                }
              />
            </Flex>
          </Stack>
        </When>
      </>
    );
  }
}
const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}
export default Signup;
