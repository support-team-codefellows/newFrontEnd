import axios from "axios";
import { Line } from "react-chartjs-2";
import React, { useEffect, useState, useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default function MyChart() {
    const [data, setData] = useState({
      labels: [],
      datasets: [
        {
          label: "My Balance",
          fill: false,
          lineTension: 0.5,
          backgroundColor: "#db86b2",
          borderColor: "#B57295",
          borderCapStyle: "butt",
          borderDashOffset: 0.0,
          borderJoinStyle: "#B57295",
          pointBorderColor: "#B57295",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#B57295",
          pointHoverBorderColor: "#B57295",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [],
        },
      ],
    });
    useEffect(() => {
        axios.get("https://test-401.herokuapp.com/rate").then((res) => {
            let usernamesArray = res.data.map(item => item.username);
            let ratings = res.data.map(item => item.rating)
            setData({...data, labels: [...data.labels, ...usernamesArray], datasets:[{...data.datasets[0], data: [...ratings]}]});
        });
      }, [data]);
    
    
  const options = {
    maintainAspectRatio: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          borderDash: [3, 3],
        },
        // beginAtZero: true, // this works
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

 


    return (
      <>
        <Line data={data} options={options} />
      </>
    );
  

    }


//   return <Line data={dat} options={options} />;
  //   const data = {
  //     labels: [
  //       "Jan",
  //       "Feb",
  //       "Mar",
  //       "Apr",
  //       "May",
  //       "Jun",
  //       "Jul",
  //       "Aug",
  //       "Sep",
  //       "Oct",
  //       "Nov",
  //       "Dec",
  //     ],
  //     datasets: [
  //       {

  //         data: [500, 300, 400, 500, 800, 650, 700, 690, 1000, 1200, 1050, 1300],
  //       },
  //     ],
  //   };
  //   dat.map(item=>{

  //         labels: [item.username],
  //         datasets: [
  //           {
  //             label: "My Balance",
  //             fill: false,
  //             lineTension: 0.5,
  //             backgroundColor: "#db86b2",
  //             borderColor: "#B57295",
  //             borderCapStyle: "butt",
  //             borderDashOffset: 0.0,
  //             borderJoinStyle: "#B57295",
  //             pointBorderColor: "#B57295",
  //             pointBackgroundColor: "#fff",
  //             pointBorderWidth: 1,
  //             pointHoverRadius: 5,
  //             pointHoverBackgroundColor: "#B57295",
  //             pointHoverBorderColor: "#B57295",
  //             pointHoverBorderWidth: 2,
  //             pointRadius: 1,
  //             pointHitRadius: 10,
  //             data: [item.rating],
  //           },
  //         ],
  //         })
// }
