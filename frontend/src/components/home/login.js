import {useState } from 'react';
import {  Button, Stack } from '@mui/material';

import {FormInput} from '../sharedComponents/formComponents'

import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';

import APIService from '../api'

function LoginPage(props){

  const errorMessages = {
    email:"Make sure you input a valid your email",
    password:"Please fill in your password"
  }

    // set the initial states for email and passwords
    const [formData, setFormData] = useState({
          email: { value: "", error: true },
          password: { value:"", error:true }
        });

    function isValid(name, value){
      switch (name){
        case "email":
          if (!isLength(value, {min:1, max: undefined})){ return false }
          if (!isEmail(value)){ return false }
          break
        case "password":
          if (!isLength(value, {min:1, max: undefined})){ return false }
          break
      }
      return true;
    }

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

      if (!formData.email.error & !formData.password.error){
        APIService.UserLogin(
          props.setToken,
          props.user,
          formData.email.value,
          formData.password.value);
      }
    }

      return (
        <div id="main_container">
          <h2>Login as {props.user}</h2>
          <Stack component="form" noValidate autoComplete="off">
            <Stack spacing={2} alignItems="center">
            <FormInput 
              onChange={handleChange} name="email" value={formData.email.value}
              error={formData.email.error} errorMessage={errorMessages.email} 
            />
            <FormInput 
              onChange={handleChange} name="password" value={formData.password.value}
              error={formData.password.error} errorMessage={errorMessages.password} 
            />
            <Button variant="contained" onClick={login}> Login </Button>
          </Stack>
          <Stack direction={"row"}>
            <Button variant="contained" sx={{backgroundColor:"white", color:"black"}}
              onClick={()=>props.setUser((props.user=="Donor")?"Charity":"Donor")}>
                Login as {(props.user=="Donor")?"Charity":"Donor"}
            </Button>

            <Button variant="contained" sx={{backgroundColor:"white", color:"black"}}
              onClick={()=>props.setIsRegistered(false)}>
                Register Instead
            </Button>
        </Stack>
        </Stack>
        </div>
      );
}

export default LoginPage;