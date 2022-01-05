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
  Text,
  Icon,
  Link,
  Box,
  Button,
  SimpleGrid,
  IconButton,
} from "@chakra-ui/react";
import { FiRefreshCw } from "react-icons/fi";

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

export const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Department Tickets",
    },
  },
};

import axios from "axios";

export default function MyChart() {
  const [refreshButton, setRefreshButton] = useState(false);
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
        labels: [...usernamesArray],
        datasets: [{ ...data.datasets[0], data: [...ratings] }],
      });
    });
  }, [data, refreshButton]);

  const [data2, setData2] = useState({
    labels: ["New Cases", "Processed", "Total"],
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
      },
    ],
  });

  useEffect(() => {
    let TelephoneTotal = [];
    let NewTelephone = [];
    let ProcessedTelephone = [];
    let OnsiteTotal = [];
    let NewOnsite = [];
    let ProcessedOnsite = [];
    let array1 = [];
    let array2 = [];

    axios
      .get("https://test-401.herokuapp.com/telephoneTicket")
      .then((res) => {
        TelephoneTotal = res.data;
        NewTelephone = res.data.filter((item) => item.status === "unprocessed");
        ProcessedTelephone = res.data.filter(
          (item) => item.status === "processed"
        );
        array1.push(NewTelephone);
        array1.push(ProcessedTelephone);
        array1.push(TelephoneTotal);
      })
      .then(() => {
        axios
          .get("https://test-401.herokuapp.com/onSiteTicket")
          .then((res) => {
            OnsiteTotal = res.data;
            NewOnsite = res.data.filter(
              (item) => item.status === "unprocessed"
            );
            ProcessedOnsite = res.data.filter(
              (item) => item.status === "processed"
            );
            array2.push(NewOnsite);
            array2.push(ProcessedOnsite);
            array2.push(OnsiteTotal);
          })
          .then(() => {
            console.log(OnsiteTotal);
            setData2({
              ...data2,
              datasets: [
                {
                  label: "Telephone",
                  data: [
                    NewTelephone?.length,
                    ProcessedTelephone?.length,
                    TelephoneTotal?.length,
                  ],
                  backgroundColor: "#191919",
                },
                {
                  label: "OnSite",
                  data: [
                    NewOnsite?.length,
                    ProcessedOnsite?.length,
                    OnsiteTotal?.length,
                  ],
                  backgroundColor: "#b57295",
                },
              ],
            });
          });
      });
  }, [data2,refreshButton]);

  return (
    <Flex
      w={["100%", "100%", "90%", "90%", "85%"]}
      p="3%"
      flexDir="column"
      overflow="auto"
      minH="100vh"
    >
      <Heading fontWeight="bold" mb={3} letterSpacing="tight">
        {" "}
        Charts
        <IconButton
          icon={<FiRefreshCw />}
          onClick={() => setRefreshButton(!refreshButton)}
          position="relative"
          left="2%"
          bgColor="blackAlpha.900"
          color="white"
        />
      </Heading>

      <Bar options={options} data={data} /><br/><br/>
      <Bar options={options2} data={data2} />
    </Flex>
  );
}
