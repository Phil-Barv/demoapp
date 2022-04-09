import React from 'react'
import {Form, Card} from 'react-bootstrap'

import {Link} from 'react-router-dom'
 
import {useState, useEffect} from 'react';

import useToken from '../../../abenFrontend/src/utils/useToken'

import Login from './Login';

import CharityDashboard from './charityDashboard';


import DonorDashboard from './donorDashboard';


import RegisterPage from './register';

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
    <Form>
    <div><h1>Home</h1></div>
    <Form.Group>
    <small> Logout <Link to='/login'>Logout</Link> </small>
    
    </Form.Group>

    </Form>
      {!token && token!=="" &&token!== undefined?  
        (isRegistered ?
          <Login setToken={setToken} setIsRegistered={setIsRegistered}/>
          : <RegisterPage setToken={setToken} setIsRegistered={setIsRegistered}/>)
        : renderView()
      }
    </div> 
  );
}

export default Home;
