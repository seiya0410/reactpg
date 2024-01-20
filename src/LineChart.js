import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'moment';
import 'chartjs-adapter-moment';

const LineChart = ({ data }) => {
  // ステータスコードごとにデータを分類

  const dataByStatus = data.reduce((acc, item) => {

    const { EdgeResponseStatus, EdgeStartTimestamp, NUM } = item;
    if (!acc[EdgeResponseStatus]) {
      acc[EdgeResponseStatus] = [];
    }
    acc[EdgeResponseStatus].push({ x: EdgeStartTimestamp, y: NUM });
    return acc;
  }, {});

  // 各ステータスコードごとのデータセットを生成
  const datasets = Object.entries(dataByStatus).map(([status, values]) => ({
    label: ` ${status}`,
    data: values,
    fill: false,
    borderColor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
  }));


  console.log(`datasets: ${JSON.stringify(datasets)}`);

  // チャートデータの作成
  const chartData = {
    datasets
  };

  // オプション設定
  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
          tooltipFormat: 'YYYY-MM-DD HH:mm:ss',
          displayFormats: {
            minute: 'HH:mm'
          }
        },
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Value'
        }
      }
    },
    responsive: true,
    maintainAspectRatio: true
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;


