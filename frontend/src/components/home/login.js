import { useState } from 'react';
import { Button, Stack } from '@mui/material';
import {FormInput, isValid, FormErrorMessage } from '../sharedComponents/formComponents'

import APIService from '../api'

function LoginPage(props){

  const errorMessages = {
    login:"Unable to login. Email or password might be incorrect or you must switch between Donor and Charity",
    email:"Make sure you input a valid email",
    password:"Please fill in your password."
  }

    // set the initial states for email and passwords
    const [formData, setFormData] = useState({
          email: { value: "", error: true },
          password: { value:"", error:true }
        });

    const [loginError, setLoginError] = useState(false);

    function handleChange(event) { 
      const {value, name} = event.target;

      if (isValid(name, value)){
        setFormData(prevNote => ({ ...prevNote,
          [name]: {value: value, error:false}
        }))
      } else {
        setFormData(prevNote => ({ ...prevNote,
          [name]: {value: value, error:true}
        }))};
      }
    
    function login(event){
      event.preventDefault();
      if (!formData.email.error & !formData.password.error) {
        APIService.Login( props.user, formData.email.value, formData.password.value)
          .then((response) => 
            {(response.access_token)
              ? props.setToken(response.access_token) 
              : setLoginError(true)
            })
      };
    }

    return (
      <div id="main_container">
        <h2 data-testid="formHeading">Login as {props.user}</h2>
        <Stack data-testid="loginForm"
          component="form" noValidate autoComplete="off" alignItems="center">
          { (loginError)
            ? <FormErrorMessage message={errorMessages.login} />
            : "" 
          }
          <Stack spacing={2} alignItems="center">
          <FormInput testid="emailInputField"
            onChange={handleChange} name="email" value={formData.email.value}
            error={formData.email.error} errorMessage={errorMessages.email}
          />
          <FormInput testid="passwordInputField"
            onChange={handleChange} name="password" value={formData.password.value}
            error={formData.password.error} errorMessage={errorMessages.password} 
          />
          <Button data-testid="loginSubmitButton"
              disabled={(formData.email.error || formData.password.error)}
              variant="contained" onClick={login}>
            Login
          </Button>
        </Stack>
        <Stack direction={"row"}>
          <Button variant="contained"
            sx={{backgroundColor:"white", color:"black"}}
            onClick={()=>props.setUser((props.user=="Donor")?"Charity":"Donor")}>
              Login as {(props.user=="Donor")?"Charity":"Donor"}
          </Button>

          <Button data-testid="registerInsteadButton" variant="contained" 
            sx={{backgroundColor:"white", color:"black"}}
            onClick={()=>props.setIsRegistered(false)}>
              Register Instead
          </Button>
      </Stack>
      </Stack>
      </div>
    );
}

export default LoginPage;