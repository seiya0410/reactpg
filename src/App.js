//import logo from './logo.svg';
//import './App.css';

const getusers = async() => {
  const response = await fetch('https://select.seiyalife.xyz');
  const body = response.json();
  return body;
  //console.log(body);
}

function App() {

  getusers().then((data) => console.log(data))
            .catch((error) => console.error(error));

  return (
   <div className="App()">
    <ul>
      <li>alpha</li>
      <li>bravo</li>
      <li>charlie</li>
      <li>delta</li>
    </ul>
   </div>
  );
}

export default App;
