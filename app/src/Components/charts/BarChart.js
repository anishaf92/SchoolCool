// src/components/BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';




const BarChart = ({ data }) => {
        const chartData = {
          labels: data.map((item) => item.subject),
          datasets: [
            {
              label: "Marks",
              data: data.map((item) => item.mark),
              backgroundColor: "rgba(75, 192, 192, 0.2", // Customize the color as needed
              borderColor: "rgba(75, 192, 192, 1)", // Customize the color as needed
              borderWidth: 1,
            },
          ],
        };
      
        const chartOptions = {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        };
      
        return <Bar data={chartData} options={chartOptions} />;
      };

export default BarChart;
