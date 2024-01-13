import React, { useState } from 'react';
import BarChart from './graph.js'; // Assuming BarChart is in the same directory

function DateForm() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [chartData, setChartData] = useState(null); // 新しいstate変数

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://select.seiyalife.xyz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fromDate, toDate }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setChartData(data); // レスポンスデータをchartDataにセット
    })
    .catch(error => {
      console.error('Error:', error);
      setChartData(null); // エラー発生時はchartDataをnullに
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fromDate">From:</label>
        <input
          type="datetime-local"
          id="fromDate"
          value={fromDate}
          onChange={e => setFromDate(e.target.value)}
        />

        <label htmlFor="toDate">To:</label>
        <input
          type="datetime-local"
          id="toDate"
          value={toDate}
          onChange={e => setToDate(e.target.value)}
        />

        <button type="submit">送信</button>
      </form>

      {/* BarChart コンポーネントを条件付きでレンダリング */}
      {chartData && <BarChart data={chartData} />}
    </div>
  );
}

export default DateForm;