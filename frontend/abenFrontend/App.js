import './App.css';
import {useState, useEffect} from 'react';
import Home from '../src/components/home/home';

function App() {

  const [state, setState] = useState({})

  return (
    <div className="App">
      <Home response={state}/>
    </div> 
  );
}

export default App;
