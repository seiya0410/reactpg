import React, { useState } from 'react';
import DateForm from './DateForm'; // DateForm コンポーネントのインポート
import BarChart from './graph'

function App() {
  const [chartData, setChartData] = useState(null);
  const handleDataChange = (fromDate, toDate) => {
    fetch('https://select.seiyalife.xyz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fromDate, toDate}),
    })
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data) && data.length > 0 ){
       // Set the result of the first element in the array to setChartData
      if (data[0].results){
        setChartData(data[0].results);
      }

      if (data.length > 1) {
        console.log(data[1].results);
      }   
    }
      else {
      // Handle cases where data is not an array or is empty
      console.log("Data is not an array or is empty");
      setChartData(null);
    }
    })
    .catch(error => {
      setChartData(null);
    })
  };

  return (
    <div className="App">
      <h1>日時選択</h1>
      <DateForm onDateChange={handleDataChange} />
      {chartData && <BarChart data={chartData} />} {/* Render BarChart here */}
    </div>
  );
}

export default App;