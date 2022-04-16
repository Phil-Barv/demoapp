import {useState, useEffect} from 'react';

import useToken from '../../utils/useToken'

import LoginPage from './login';
import RegisterPage from './register';

import CharityDashboard from './charityDashboard';
import DonorDashboard from './donorDashboard';

import "./index.css"

function Home() {

  const { token, removeToken, setToken } = useToken();

  const [user, setUser] = useState("Donor");
  const [apiResponse, setResponse] = useState({});
  const [isRegistered, setIsRegistered ] = useState(true);

const renderView = () => {
    switch(user){
        case "Donor":
          return(<DonorDashboard
                    removeToken={removeToken}
                    token={token}
                    response={apiResponse}/>)
        case "Charity":
            return(<CharityDashboard
                      removeToken={removeToken}
                      token={token}
                      response={apiResponse}/>)
    }
  }

  return (
    <div>
      {!token && token!=="" &&token!== undefined?  
        (isRegistered ?
          <LoginPage setToken={setToken} user={user} setUser={setUser} setIsRegistered={setIsRegistered}/>
          : <RegisterPage setToken={setToken} user={user} setUser={setUser} setIsRegistered={setIsRegistered}/>)
        : renderView()
      }
    </div> 
  );
}

export default Home;
