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
    acc[EdgeResponseStatus].push({ t: EdgeStartTimestamp, y: NUM });
    return acc;
  }, {});

  console.log(`test: ${JSON.stringify(dataByStatus)}`);

  // 各ステータスコードごとのデータセットを生成
  const datasets = Object.entries(dataByStatus).map(([status, values]) => (
    {
    label: `Status ${status}`,
    data: values.map(v => v.y),
    fill: false,
    borderColor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
  }));

  console.log(`datasets: ${JSON.stringify(datasets)}`);

  // チャートデータの作成
  const chartData = {
    labels: [...new Set(data.map(item => item.EdgeStartTimestamp))], // Extract timestamps for labels
    datasets
  };

  console.log(`${JSON.stringify(chartData)}`)
  // X軸に使用するラベルを取得（重複を避ける）
  //const timestamps = [...new Set(data.map(item => item.EdgeStartTimestamp))];

/* const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
          tooltipFormat: 'YYYY-MM-DD HH:mm'
        },
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Value'
        }
      }
    }
  }; 
*/

  return <Line data={chartData} />;
 // return <Line data={chartData} />;
};

export default LineChart;