import React from 'react';
import { Card } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
const LineChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Sales for 2020 (M)',
        data: [1000, 2000, 2100, 1500, 2500],
      },
    ],
  };
  return <Line data={data} />;
};

export default LineChart;
