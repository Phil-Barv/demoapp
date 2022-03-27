import './App.css';
import {useState, useEffect} from 'react';
import Home from './components/home/home';

function App() {

  const [state, setState] = useState({})

  useEffect(() => {
    fetch('/api').then(response => {
      if (response.status === 200) {
        return response.json()
      }
    }).then(data => setState(data))
    .then(error => console.log(error))
  }, [])

  return (
    <div className="App">
      <Home response={state}/>
    </div> 
  );
}

export default App;
