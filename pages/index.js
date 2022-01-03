import ReactStars from "react-stars";
import { BsFillChatDotsFill } from "react-icons/bs";
import {useContext} from 'react';
import { LoginContext } from "../components/auth/context"; 
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Flex,
  Box,
  Spacer,
  PopoverAnchor,
} from '@chakra-ui/react'
import React, { useEffect } from "react";
import ChatFrom from "../components/chat/ChatForm";
import { If, Then, Else } from 'react-if';
export default function Home() {
  const Context = useContext(LoginContext);
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <>

      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={24}
        color2={"#ffd700"}
      />
      <If condition={Context.loggedIn}>
        
      </If>


    </>
  );
}
