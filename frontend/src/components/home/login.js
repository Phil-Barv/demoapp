

import {Form, Button, Card} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
//import {login} from '.../auth'



const LoginPage=()=>{


    
    //const [logged] = useAuth();
    const {register,handleSubmit,reset,formState:{errors}}=useForm()
    const navigate = useNavigate()
    

    const userLogin=(data)=>{
       console.log(data)

       const requestOptions={
           method:"POST",
           headers:{
               'content-type':'application/json'
           },
           body:JSON.stringify(data)
       }
        
       fetch('/auth/login',requestOptions)
       .then(res=>res.json())
       .then(data=>{
           console.log(data.access_token)
           
           if (data.access_token){

            console.log("access token is", data.access_token)

           // login(data.access_token)
            
            navigate('/')

           }
           else{
               alert('Invalid username or password')
           }


       })



       reset()
    }
  return (
    <Card>
        <Card.Body>
            <h2 className = "text-center mb-4 "> Login</h2>
            <Form>
                <Form.Group id = "email">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                    type = "username" 
                    placeholder='username' 
                    {...register('username',{required:true})}
                    />
                </Form.Group>

                <Form.Group id = "password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type = "password" 
                    placeholder='Password' 
                    {...register('password',{required:true})}
                    required/>
                </Form.Group>
                <br/>
                <Form.Group>
                    <small>Do not have an account? <Link to='/signup'>Create an account</Link></small>
                </Form.Group>
                <br/>


                <Button onClick={handleSubmit(userLogin)} className = "w-100" type  = "submit">Login</Button>
            </Form>
        </Card.Body>
    </Card>
  )
}

export default LoginPage




// import {useState, useEffect} from 'react';
// import axios from "axios";

// function LoginPage(props){

//     const [loginForm, setloginForm] = useState({
//         email: "",
//         password: ""
//     })

//     function registerInstead(){
//         props.setIsRegistered(false);
//     };

//     function logMeIn(event) {
//         axios({
//           method: "POST",
//           url:"/token",
//           data:{
//             email: loginForm.email,
//             password: loginForm.password
//            }
//         })
//         .then((response) => {
//           props.setToken(response.data.access_token)
//         }).catch((error) => {
//           if (error.response) {
//             console.log(error.response)
//             console.log(error.response.status)
//             console.log(error.response.headers)
//             }
//         })
  
//         setloginForm(({
//           email: "",
//           password: ""}))
  
//         event.preventDefault()
//       }
  
//       function handleChange(event) { 
//         const {value, name} = event.target
//         setloginForm(prevNote => ({
//             ...prevNote, [name]: value})
//         )}
  
//       return (
//         <div>
//           <h1>Login</h1>
//             <form className="login">
//               <input onChange={handleChange} 
//                     type="email"
//                     text={loginForm.email} 
//                     name="email" 
//                     placeholder="Email" 
//                     value={loginForm.email} />
//               <input onChange={handleChange} 
//                     type="password"
//                     text={loginForm.password} 
//                     name="password" 
//                     placeholder="Password" 
//                     value={loginForm.password} />
  
//             <button onClick={logMeIn}>Submit</button>
//           </form>
//           <button onClick={registerInstead}>Register</button>
//         </div>
//       );
// }

// export default LoginPage;

