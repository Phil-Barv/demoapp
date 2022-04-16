import {useState, useEffect} from 'react';
import { Box, FormControl, FormHelperText, Input, InputLabel, Stack, TextField } from '@mui/material';
import APIService from '../api'
import axios from "axios";

function LoginPage(props){

    // set the initial states for email and passwords
    const [form, setForm] = useState({
          email: {
            value: "",
            error: true,
            errorMessage: "Make sure this is not null"
          },
          password: { 
            value:"",
            error:true,
            errorMessage: "Make sure this is not null"
          }
      });

    // render register view
    function registerInstead(){
        props.setIsRegistered(false);
    };

    function handleChange(event) { 
      const {value, name} = event.target;

      if (value.length>1){
        setForm(prevNote => ({ ...prevNote,
          [name]: {value: value, error:false, errorMessage:""}
        }))
      } else {
        setForm(prevNote => ({ ...prevNote,
          [name]: {value: value, error:true, errorMessage:"Make sure this is not null"}
        }))};
      }
    
    function userLogin(event, email, password){
      event.preventDefault();
      if (!form.email.error & !form.password.error){
        APIService.UserLogin(props,email,password);
      }
    }

      return (
        <div className='container'>
          <h2>Login</h2>
          <Stack component="form" noValidate autoComplete="off" justifyContent="space-between">
            <Stack spacing={2}>
            <FormControl error={form.password.error}>
              <TextField
                label="email"
                name="email"
                value={form.email.value}
                onChange={handleChange}
                aria-describedby="email"
                size="small"
                error={form.email.error}
              />
              {(form.email.error)
                ? <FormHelperText id="component-error-text">
                  {form.email.errorMessage}
                  </FormHelperText>
                : "" }
            </FormControl>
            <FormControl error={form.password.error}>
              <TextField
                label="password"
                name="password"
                type="password"
                value={form.password.value}
                onChange={handleChange}
                aria-describedby="password"
                size="small"
                error={form.password.error}
              />
              {(form.password.error)
                ? <FormHelperText id="component-error-text">
                  {form.password.errorMessage}
                  </FormHelperText>
                : ""}
            </FormControl>
            </Stack>
          <Stack direction="row" justifyContent="space-between"> 
            <button onClick={registerInstead} id='register' >Register</button>
            <button onClick={userLogin} id='submit'>Submit</button>
            </Stack>
          </Stack>
        </div>
      );
}

export default LoginPage;