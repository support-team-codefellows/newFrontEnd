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
import axios from "axios";


import React, { useEffect ,useState} from "react";
import ChatFrom from "../components/chat/ChatForm";
import { If, Then, Else } from 'react-if';
import  MyChart from '../components/myChart'
export default function Home() {
 
  const Context = useContext(LoginContext);
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <>
<MyChart />
    



    </>
  );
}
