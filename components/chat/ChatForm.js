/* eslint-disable react-hooks/rules-of-hooks */
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import {
  Button,
  Input,
  Stack,
  Flex,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  Text,
  FormLabel,
} from "@chakra-ui/react";
import { LoginContext } from "../auth/context";
import Router from "next/router";
import { useContext, useEffect } from "react";
import { If, Else } from "react-if";
import { Data } from "../faqData";
const socket = io.connect("https://project401.herokuapp.com/");
function chatFrom() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isdata, setisdata] = useState({ query: "" });
  const [data, setdata] = useState("");
  const Context = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [showModal, setShowModal] = useState(true);
  useEffect(() => {
    setUsername(Context?.user?.username);
    setShowModal(true);
  }, [Context.user.username]);
  
  const joinRoom = () => {
    setRoom("1");
    if (username !== "" && room !== "") {
      socket.emit("joinRoom", room);
      setShowChat(true);
    }
  };

  const handleSerach = (e) => {
    Data.filter((item) => {
      if (item.question.includes(isdata.query)) {
        setdata(item.answer);
      } else {
        setdata(
          "Sorry, we don't have answer for your question, please take the time to chat with us"
        );
      }
    });
  };

  return (
    <>
      <If condition={Context.loggedIn}>
        <Flex
          className="App"
          flexDir="Column"
          justifyContent="center"
          align="center"
        >
          {showModal ? (
            <>
              <Input
                placeholder="Search"
                onChange={(e) => setisdata({ query: e.target.value })}
                value={isdata.query}
                size="lg"
                width="100%"
                borderRadius="md"
                borderColor="gray.200"
                _focus={{
                  borderColor: "blue.500",
                }}
              />

              <Button
                colorScheme="blackAlpha"
                onClick={() => {
                  handleSerach();
                  onOpen();
                }}
                size="md"
                bgColor="blackAlpha.900"
                color="#fff"
              >
                Search
              </Button>
            </>
          ) : (
            <></>
          )}

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Text> {isdata.query}?</Text>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {" "}
                <Text>{data}</Text>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blackAlpha" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* <h2>Please </h2> */}
          {!showChat ? (
            <Stack
              justifyContent="center"
              align="center"
              padding="20px"
              w="300px"
              maxW="20vw"
              className="chat-window"
              bg="#F7F7F7"
              borderRadius="20px"
            >
              <Input
                type="text"
                placeholder="Add a username"
                defaultValue={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
              {/* <Input
                m="10px"
                type="text"
                placeholder="Room ID "
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
              /> */}
              <Button
                onClick={() => {
                  joinRoom();
                  setShowModal(false);
                }}
              >
                Lets chat!!{" "}
              </Button>
            </Stack>
          ) : (
            <Box h="50vh">
              <Chat socket={socket} username={username} room={room} />
            </Box>
          )}
        </Flex>
      </If>
      <Else></Else>
    </>
  );
}

export default chatFrom;
