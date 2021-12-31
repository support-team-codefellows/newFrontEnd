import React, { Children } from "react";
import { When } from "react-if";
import superagent from "superagent";
import { LoginContext } from "../components/auth/context";
import base64 from "base-64";
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
  InputLeftElement,
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
    let API = "https://project401.herokuapp.com";
    console.log(this.state.email, this.state.password);
    const response = await superagent
      .post(`${API}/sign-in`)
      .set(
        "authorization",
        `Basic ${base64.encode(`${this.state.email}:${this.state.password}`)}`
      );
    if (response.status === 200) {
      this.context.login(this.state.email, this.state.password, response.body);
      console.log(response.body, "response");
    }
  };
  handleShowClick = () =>
    this.setState({ showPassword: !this.state.showPassword });

  render() {
    return (
      <>
        <When condition={this.context.loggedIn}>
          <Button className="btn btn-primary" onClick={this.context.logout}>
            Log Out
          </Button>
        </When>
        <When condition={!this.context.loggedIn}>
          <Flex
            flexDirection="column"
            width="100%"
            height="100vh"
            backgroundColor="gray.200"
            justifyContent="center"
            alignItems="center"
          >
            <Stack
              flexDir="column"
              mb="2"
              justifyContent="center"
              alignItems="center"
            >
              <Box minW={{ base: "90%", md: "468px" }}>
                <Heading color="black">Welcome Back</Heading>
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
                    <Input
                      type={this.state.showPassword ? "text" : "password"}
                      placeholder="password"
                      name="password"
                      onChange={this.handleChange}
                    />
                 
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={this.handleShowClick}
                      >
                        {this.state.showPassword ? "Hide" : "Show"}
                      </Button>
                   
                  

                    <Button
                      type="submit"
                      colorScheme="gray"
                      size="lg"
                      fontSize="md"
                    >
                      Sign in
                    </Button>
                  </Stack>
                </chakra.form>

                <Box>
                  New to us?{" "}
                  <Link color="teal.500" href="/signup">
                    Sign Up
                  </Link>
                </Box>
              </Box>{" "}
            </Stack>
          </Flex>
        </When>
      </>
    );
  }
}

export default Login;
{
}
