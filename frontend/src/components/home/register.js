import { useState } from 'react';
import { Button, Stack } from '@mui/material';

import {FormInput} from '../sharedComponents/formComponents'
import APIService from '../api'

function RegisterPage(props){

  const errorMessages = {
    name:"Please input a name with at least 4 characters",
    email:"Please input a valid email",
    password:"Please inpur a valid password"
  }

  const [formData, setFormData] = useState({
    name: {value:"", error:true},
    email: {value:"", error:true},
    password: {value:"", error:true}}
    );

  function handleChange(event) { 
    const {value, name} = event.target
    setFormData(prevNote => ({
        ...prevNote, [name]: {value:value, error:false}}))
  };

  function register(){
    if (!formData.name.error & !formData.email.error & !formData.password.error){
      APIService.Register(
        props.setIsRegistered,
        props.user,
        formData.name.value,
        formData.email.value,
        formData.password.value);
    }
  };

    return (
      <div  id="main_container">
        <h2>Register as a {props.user}</h2>
        <Stack component="form" noValidate autoComplete="off" alignItems={"center"}>
            <Stack spacing={2}>
            <FormInput 
              onChange={handleChange} name="name" value={formData.name.value}
              error={formData.name.error} errorMessage={errorMessages.name} 
            />
            <FormInput 
              onChange={handleChange} name="email" value={formData.email.value}
              error={formData.email.error} errorMessage={errorMessages.email} 
            />
            <FormInput 
              onChange={handleChange} name="password" value={formData.password.value}
              error={formData.password.error} errorMessage={errorMessages.password} 
            />
            </Stack>
          <Button variant="contained" onClick={register}>
            Register
          </Button>

        </Stack>
        <Stack direction={"row"}>

          <Button variant="contained" sx={{backgroundColor:"white", color:"black"}}
            onClick={()=>props.setUser((props.user=="Donor")?"Charity":"Donor")}>
              Register as a {(props.user=="Donor")?"Charity":"Donor"}
          </Button>

          <Button variant="contained" sx={{backgroundColor:"white", color:"black"}}
            onClick={()=>props.setIsRegistered(true)}>
              Login Instead
          </Button>

        </Stack>
      </div>
    );
}

export default RegisterPage;