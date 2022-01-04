import React, { useEffect, useState, useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import {
    Flex,
    Heading,
    Avatar,
    Text,
    Icon,
    Link,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Box,
    Container,
    Td,
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    Textarea,
    IconButton,
  } from "@chakra-ui/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Employees Rating",
    },
  },
};

//////////////////////////////////////////

import axios from "axios";

export default function MyChart() {
  const [refreshButton,setRefreshButton]=useState(false)
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Rating",
        data: [],
        backgroundColor: "#191919",
      },
    ],
  });

  useEffect(() => {
    axios.get("https://test-401.herokuapp.com/rate").then((res) => {
      let usernamesArray = res.data.map((item) => item.username);
      let ratings = res.data.map((item) => item.rating);
      setData({
        ...data,
        labels: [ ...usernamesArray],
        datasets: [{ ...data.datasets[0], data: [...ratings] }],
      });
    });
  }, [refreshButton]);

const [TelephoneTotal,setTelephoneTotal]=useState(0);
const [NewTelephone,setNewTelephone]=useState(0)
const [ProcessedTelephone,setProcessedTelephone]=useState(0)

const [OnsiteTotal,setOnsiteTotal]=useState(0)
const [NewOnsite,setNewOnsite]=useState(0)
const [ProcessedOnsite,setProcessedOnsite]=useState(0)



const [data2, setData2] = useState({
  labels: ['New Cases', "Processed", "Total"],
  datasets: [
    {
      label: "Telephone",
      data: [],
      backgroundColor: "#191919",
    },
    {
      label: "OnSite",
      data: [],
      backgroundColor: "red",
    }
  ],
});





  useEffect(() => {
    let array1=[]
    let array2=[]
  
    axios.get("https://test-401.herokuapp.com/telephoneTicket").then((res) => {
     
        setTelephoneTotal(res.data);
        setNewTelephone(res.data.filter((item) => item.status === "unprocessed"));
        setProcessedTelephone(
          res.data.filter((item) => item.status === "processed")
        );
        console.log('alooo',TelephoneTotal);
        array1.push(NewTelephone)
        array1.push(ProcessedTelephone)
        array1.push(TelephoneTotal)
      
    });
    
    axios.get("https://test-401.herokuapp.com/onSiteTicket").then((res) => {
     
        setOnsiteTotal(res.data);
        setNewOnsite(res.data.filter((item) => item.status === "unprocessed"));
        setProcessedOnsite(
          res.data.filter((item) => item.status === "processed")
        );
        array2.push(NewOnsite)
        array2.push(ProcessedOnsite)
        array2.push(OnsiteTotal)
      
    });
    
console.log('-------------',NewTelephone);
    setData2({
      ...data2,
      
      datasets: [
        {
          label: "Telephone",
          data: [NewTelephone.length,ProcessedTelephone.length,TelephoneTotal.length],
          backgroundColor: "#191919",
        },
        {
          label: "OnSite",
          data: [NewOnsite.length,ProcessedOnsite.length,OnsiteTotal.length],
          backgroundColor: "red",
        }
      ],
    });

  }, [refreshButton]);






  return (
    
    <Flex
      w={["100%", "100%", "90%", "90%", "85%"]}
      p="3%"
      flexDir="column"
      overflow="auto"
      minH="100vh"
    >

      <Flex
        align="center"
        justify={{ base: "center", md: "space-around", xl: "space-between" }}
        direction={{ base: "column-reverse", md: "row" }}
        wrap="no-wrap"
        minH="70vh"
        px={8}
        mb={16}
      >
        <Button onClick={()=>setRefreshButton(!refreshButton)}>Refresh</Button>
        <Bar options={options} data={data} />
        <Bar options={options} data={data2} />
      </Flex>
    </Flex>
  );
}


/////////////

//////////