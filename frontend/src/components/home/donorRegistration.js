import {useState, useEffect} from 'react';
import axios from "axios";

function DonorRegistration(props){

    const [registerForm, setRegisterForm] = useState({
      email: "",
      username: "",
      password: "",
    })
  
    function register(event) {
        axios({
          method: "POST",
          url:"/register-donor",
          data:{
            email: registerForm.email,
            username: registerForm.username,
            password: registerForm.password
           }
        })
        .then((response) => {
          props.setToken(response.data.access_token)
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })
  
        setRegisterForm({
          email: "",
          username: "",
          password: "",
        })

        event.preventDefault()
      }
  
      function handleChange(event) { 
        const {value, name} = event.target
        setRegisterForm(prevNote => ({
            ...prevNote, [name]: value})
        )}
  
      return (
        <div>
            <form>
              <input onChange={handleChange} 
                    type="text"
                    text={registerForm.username} 
                    name="username" 
                    placeholder="Username" 
                    value={registerForm.username} />
              <input onChange={handleChange} 
                    type="email"
                    text={registerForm.email} 
                    name="email" 
                    placeholder="Email" 
                    value={registerForm.email} />
              <input onChange={handleChange} 
                    type="password"
                    text={registerForm.password} 
                    name="password" 
                    placeholder="Password" 
                    value={registerForm.password} />
  
            <button onClick={register}>Register</button>
          </form>
        </div>
      );
}

export default DonorRegistration;