import { useState } from 'react';
import { Button, Stack } from '@mui/material';

import { FormInput, isValid, FormErrorMessage } from '../sharedComponents/formComponents'
import APIService from '../api'

function RegisterPage(props){

  const errorMessages = {
    registration: "Registration unsuccessful. Have you used this email for another account?",
    name:"Please input a name between 4 and 20 characters",
    email:"Please input a valid email that is not above 100 characters",
    password:"Please input a strong password between 8 and 100 characters,\
              with at least one number, one symbol, and \
              one uppercase and one lowercase letter."
  }

  const [formData, setFormData] = useState({
    name: {value:"", error:true},
    email: {value:"", error:true},
    password: {value:"", error:true}}
    );

  const [registrationError, setRegistrationError] = useState(false);

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

  function register(){
    if (!formData.name.error & !formData.email.error & !formData.password.error){
      APIService.Register(
        props.setIsRegistered,
        setRegistrationError,
        props.user,
        formData.name.value,
        formData.email.value,
        formData.password.value);
    }
  };

    return (
      <div  id="main_container">
        <h2>Register as a {props.user}</h2>
      
        <Stack component="form" noValidate autoComplete="off" alignItems="center">
            { (registrationError)
              ? <FormErrorMessage message={errorMessages.registration} />
              : "" 
            }
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
          <Button variant="contained" onClick={register}
            disabled={(formData.email.error || formData.password.error || formData.name.error)}>
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