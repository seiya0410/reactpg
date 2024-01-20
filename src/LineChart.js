import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'moment';
import 'chartjs-adapter-moment';

const LineChart = ({ data }) => {

    const modKeys = data.map(item => {
        const keys = Object.keys(item);
        const newItem = {};

        newItem[keys[0]] = item[keys[0]]

        if (keys.length > 1) newItem.glabel = item[keys[1]];
        if (keys.length > 2) newItem.gvalue = item[keys[2]];
    
        return newItem;

    })
  // ステータスコードごとにデータを分類

  console.log(`modekey:${JSON.stringify(modKeys)}`)

  const dataByStatus = modKeys.reduce((acc, item) => {

    const {EdgeStartTimestamp, glabel, gvalue } = item;
    if (!acc[glabel]) {
      acc[glabel] = [];
    }
    acc[glabel].push({ x: EdgeStartTimestamp, y: gvalue });
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


