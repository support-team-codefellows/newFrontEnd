import React, { Children } from "react";
import { When } from "react-if";
import superagent from "superagent";
import { LoginContext } from "../components/auth/context";
import base64 from "base-64";
import Router from "next/router";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import Swal from "sweetalert2";
import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Flex,
  Heading,
  InputGroup,
  Icon,
  Box,
  Link,
  Avatar,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
class Login extends React.Component {
  static contextType = LoginContext;
  constructor(props) {
    super(props);
    this.state = { showPassword: false, email: "", password: "" };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    // let API = "https://project401.herokuapp.com";
    let API = "https://project401.herokuapp.com";
    console.log(this.state.email, this.state.password);
    const response = await superagent
      .post(`${API}/sign-in`)
      .set(
        "authorization",
        `Basic ${base64.encode(`${this.state.email}:${this.state.password}`)}`
      );
    console.log("this is the response ", response.status);
    if (response.status === 200) {
      Swal.fire({
        position: "centered",
        icon: "success",
        title: "You Logged in successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      this.context.login(this.state.email, this.state.password, response.body);
      console.log(response.body, "response");
    }
    Router.push("/");
  };
  handleShowClick = () =>
    this.setState({ showPassword: !this.state.showPassword });

  render() {
    return (
      <>
        {/* <When condition={this.context.loggedIn}>
          <Button className="btn btn-primary" onClick={this.context.logout}>
            Log Out
          </Button>
        </When> */}
        <When condition={!this.context.loggedIn}>
          <Flex
            flexDirection="column"
            width="100%"
            height="100vh"
            backgroundColor="white"
            justifyContent="center"
            alignItems="center"
          >
            <Heading color="black">Welcome Back</Heading>
            <br />
            <chakra.form onSubmit={this.handleSubmit}>
              <Stack spacing="6">
                <FormControl>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Your Email"
                    name="email"
                    onChange={this.handleChange}
                  />
                </FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    type={this.state.showPassword ? "text" : "password"}
                    placeholder="password"
                    name="password"
                    onChange={this.handleChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={this.handleShowClick}
                    >
                      <Icon
                        as={this.state.showPassword ? ViewOffIcon : ViewIcon}
                      />
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Button
                  type="submit"
                  colorScheme="pink"
                  size="lg"
                  fontSize="md"
                  bgColor="blackAlpha.900"
                >
                  Sign in
                </Button>
              </Stack>
            </chakra.form>

            <Box marginTop="2%">
              New to us?{" "}
              <Link color="#b57295" href="/signup">
                Sign Up
              </Link>
            </Box>
          </Flex>
        </When>
      </>
    );
  }
}

export default Login;
{
}
