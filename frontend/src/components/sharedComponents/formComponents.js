import { FormControl, FormHelperText, TextField } from '@mui/material';

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