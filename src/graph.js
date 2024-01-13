import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const BarChart = ({ data }) => {
  // JSONデータからグラフのデータを生成

  if (!Array.isArray(data)) {
    console.error('Data is not an array:', data);
    return <p>Data is not an array.</p>;
  }

  const chartData = {
    labels: data.map(item => item.ClientIP),
    datasets: [
      {
        label: 'Client IP Counts',
        data: data.map(item => item.NUM),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default BarChart;