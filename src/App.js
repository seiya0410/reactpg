import React, { useState } from 'react';
import DateForm from './DateForm'; // DateForm コンポーネントのインポート
import BarChart from './graph'
import LineChart from './LineChart';

function App() {
  //const [chartData, setChartData] = useState(null);

  const [ clientIPData, setClientIPData ] = useState(null);
  const [edgeResponseStatusData, setEdgeResponseStatusData] = useState(null);
  const [originReposeTimeData, setOriginReponseTimeData] = useState(null);

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
       console.log(`data: ${JSON.stringify(data)}`)
      if (data[0]){
        setClientIPData(data[0]);
      }
      if (data.length > 1 && data[1]) {
        setEdgeResponseStatusData(data[1]);
        
      }   
      if (data.length > 1 && data[2]) {
        setOriginReponseTimeData(data[2]);
        console.log(`orign data:${JSON.stringify(data[2].results)}`);
      }
    } else {
      // Handle cases where data is not an array or is empty
      console.log("Data is not an array or is empty");
        setClientIPData(null);
        setEdgeResponseStatusData(null);
    }
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      setClientIPData(null);
      setEdgeResponseStatusData(null);
    })
  };

  return (
    <div className="App">
      <h1>日時選択</h1>
      <DateForm onDateChange={handleDataChange} />
      {clientIPData && <BarChart data={clientIPData} />}
      {edgeResponseStatusData && <LineChart data={edgeResponseStatusData} />}
      {originReposeTimeData && <LineChart data={originReposeTimeData} />}
    </div>
  );
}

export default App;