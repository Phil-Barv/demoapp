import {useState, useEffect} from 'react';

import LoginPage from './login';
import CharityDashboard from './charityDashboard';
import DonorDashboard from './donorDashboard';

function Home() {

  const [userState, setUserState] = useState(0);
  const [apiResponse, setResponse] = useState({});

  useEffect(() => {
    fetch('/api').then(response => {
      if (response.status === 200) {
        return response.json()
      }
    }).then(data => setResponse(data))
    .then(error => console.log(error))
  }, [])

const renderView = () => {
    switch(userState){
        case 0:
            return(<LoginPage setUserState={setUserState}/>)
        case 1:
            return(<CharityDashboard
                      setUserState={setUserState}
                      response={apiResponse}/>)
        case 2:
            return(<DonorDashboard
                      setUserState={setUserState}
                      response={apiResponse}/>)
        default:
            return(<LoginPage setUserState={setUserState}/>)
    }
  }

  return (
    <div>
      {renderView()}
    </div> 
  );
}

export default Home;
