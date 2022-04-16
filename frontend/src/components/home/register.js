import {useState } from 'react';
import {  Button, FormControl, FormHelperText,
          Stack, TextField } from '@mui/material';
import APIService from '../api'

function RegisterInput(props){
  return (
    <FormControl error={props.error} >
      <TextField sx={{backgroundColor:"rgba(255, 255, 255, 1)",borderRadius:"4px"}}
        label={props.name}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        aria-describedby={props.name}
        type={(props.name=="password")?"password":"normal"}
        size="small" variant="filled"
        error={props.error}
      />
      {(props.error)
        ? <FormHelperText id="component-error-text">
          {props.errorMessage}
          </FormHelperText>
        : "" }
    </FormControl>
  )
}

function RegisterPage(props){

  const errorMessages = {
    name:"Please input a name with at least 4 characters",
    email:"Please input a valid email",
    password:"Please inpur a valid password"
  }

  const [user, setUser] = useState("Donor");
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
      APIService.Register(props.setToken, user, formData.name, formData.email, formData.password);
    }
  };

    return (
      <div  id="main_container">
        <h2>Registering as a {user}</h2>
        <Stack component="form" noValidate autoComplete="off" alignItems={"center"}>
            <Stack spacing={2}>
            <RegisterInput 
              onChange={handleChange} name="name" value={formData.name.value}
              error={formData.name.error} errorMessage={errorMessages.name} 
            />
            <RegisterInput 
              onChange={handleChange} name="email" value={formData.email.value}
              error={formData.email.error} errorMessage={errorMessages.email} 
            />
            <RegisterInput 
              onChange={handleChange} name="password" value={formData.password.value}
              error={formData.password.error} errorMessage={errorMessages.password} 
            />
            </Stack>
          <Button variant="contained" onClick={register}>
            Submit
          </Button>

        </Stack>
        <Stack direction={"row"}>

          <Button variant="contained" sx={{backgroundColor:"white", color:"black"}}
            onClick={()=>setUser((user=="Donor")?"Charity":"Donor")}>
              Register as a {(user=="Donor")?"Charity":"Donor"}
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