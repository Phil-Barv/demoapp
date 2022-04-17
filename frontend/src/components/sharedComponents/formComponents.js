import { Box, FormControl, FormHelperText, TextField, Typography } from '@mui/material';

import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import isStrongPassword from 'validator/lib/isStrongPassword';

export function FormInput (props){
    return (
      <FormControl error={props.error} >
        <TextField sx={{backgroundColor:"rgba(255, 255, 255, 1)", borderRadius:"4px"}}
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


  export function isValid (name, value){
    switch (name){
      case "name":
        if (!isLength(value, {min:4, max: 20 })){ return false }
        break
      case "email":
        if (!isLength(value, {min:1, max: 100 })){ return false }
        if (!isEmail(value)){ return false }
        break
      case "password":
        if (!isLength(value, {min:1, max: 100 })){ return false }
        if (!isStrongPassword(value)){ return false }
        break
    }
    return true;
  };

export function FormErrorMessage (props){

  return (
    <Typography sx={{color:"000000", textAlign:"center"}} mb={3} 
      variant="caption" display="block" width={250}>
        {props.message}
    </Typography>
  )
}