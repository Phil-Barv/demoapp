import {useState, useEffect} from 'react';
import axios from "axios";

function LoginPage(props){

    const [loginForm, setloginForm] = useState({
        email: "",
        password: ""
    })

    function registerInstead(){
        props.setIsRegistered(false);
    };

    function logMeIn(event) {
        axios({
          method: "POST",
          url:"/token",
          data:{
            email: loginForm.email,
            password: loginForm.password
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
  
        setloginForm(({
          email: "",
          password: ""}))
  
        event.preventDefault()
      }
  
      function handleChange(event) { 
        const {value, name} = event.target
        setloginForm(prevNote => ({
            ...prevNote, [name]: value})
        )}
  
      return (
        <div className='container'>
          <h2>Login</h2>
            <form>
              <input onChange={handleChange} 
                    type="email"
                    text={loginForm.email} 
                    name="email" 
                    placeholder="Email" 
                    value={loginForm.email} />
                    
              <input onChange={handleChange} 
                    type="password"
                    text={loginForm.password} 
                    name="password" 
                    placeholder="Password" 
                    value={loginForm.password} />
  
            <button onClick={logMeIn} id='submit'>Submit</button>
            <button onClick={registerInstead} id='register' >Register</button>
          
          </form>
        </div>
      );
}

export default LoginPage;