/* eslint-disable react-hooks/rules-of-hooks */
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import { Button, Input, Stack, Flex, Box } from "@chakra-ui/react";
import { LoginContext } from "../auth/context";
import { useContext, useEffect } from "react";
const socket = io.connect("https://project401.herokuapp.com/");
function chatFrom() {
  const Constext = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  useEffect(() => {
    setUsername(Constext?.user?.username);
  }, [Constext.user.username]);
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("joinRoom", room);
      setShowChat(true);
    }
  };

  return (
    <Flex
      className="App"
      flexDir="Column"
      justifyContent="center"
      align="center"
    >
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
          <Input
            m="10px"
            type="text"
            placeholder="Room ID "
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <Button onClick={joinRoom}>Join a Room</Button>
        </Stack>
      ) : (
        <Box h="50vh">
          <Chat socket={socket} username={username} room={room} />
        </Box>
      )}
    </Flex>
  );
}

export default chatFrom;
