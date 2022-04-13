import {useState, useEffect} from 'react';

import useToken from '../../utils/useToken'

import LoginPage from './login';
import RegisterPage from './register';

import CharityDashboard from './charityDashboard';
import DonorDashboard from './donorDashboard';

function Home() {

  const { token, removeToken, setToken } = useToken();

  const [userState, setUserState] = useState(2);
  const [apiResponse, setResponse] = useState({});
  const [isRegistered, setIsRegistered ] = useState(true);

const renderView = () => {
    switch(userState){
        case 1:
            return(<CharityDashboard
                      removeToken={removeToken}
                      token={token}
                      response={apiResponse}/>)
        case 2:
            return(<DonorDashboard
                      removeToken={removeToken}
                      token={token}
                      response={apiResponse}/>)
    }
  }

  return (
    <div>
      {!token && token!=="" &&token!== undefined?  
        (isRegistered ?
          <LoginPage setToken={setToken} setIsRegistered={setIsRegistered}/>
          : <RegisterPage setToken={setToken} setIsRegistered={setIsRegistered}/>)
        : renderView()
      }
    </div> 
  );
}

export default Home;
