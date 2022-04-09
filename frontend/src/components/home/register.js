import React, { useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'


const RegisterPage = () => {


    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [show,setShow]=useState(false)
    const [serverResponse,setServerResponse]=useState('')

    const submitForm = (data) => {

        console.log(data)


        if (data.password === data.confirmpassword) {


            const body = {
                username: data.username,
                email: data.email,
                password: data.password
            }

            const requestOptions = {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(body)
            }


            fetch('/auth/signup', requestOptions)
                .then(res => res.json())
                .then(data =>{
                    console.log(data)
                    setServerResponse(data.message)
                    setShow(true)
                })
                .catch(err => console.log(err))

            reset()
        }

        else {
            alert("Passwords do not match")
        }


    } 

  return (

    <>
    <Alert variant="success" onClose={() => {setShow(false)
                }} dismissible>
        <p>
            {serverResponse}
        </p>
    </Alert>

  

    <Card>
        <Card.Body>
            <h2 className = "text-center mb-4 "> Sign Up</h2>
            <Form>
                <Form.Group id = "username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                    type = "username" 
                    placeholder='username'  
                    
                    name = "username" 
                    {...register("username", { required: true})}
                    required
                    />
                </Form.Group>
                <Form.Group id = "email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                    type = "email" 
                    placeholder='Email'  
                    
                    name = "email" 
                    {...register("email", { required: true})}
                    required
                    />
                </Form.Group>

                <Form.Group id = "password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type = "password" 
                    placeholder='Password'  
                      
                    name = "password"
                    {...register("password", { required: true})}
                    required
                    />
                </Form.Group>

                <Form.Group id = "passwordconfirm">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control 
                    type = "password" 
                    placeholder=' Confirm Password'  
                     
                    name = "confirmpassword" 
                    {...register("confirmpassword", { required: true})}
                    required
                    />
                </Form.Group>
                <br/>
                <Button onClick = {handleSubmit(submitForm)} className = "w-100" type  = "submit" >Sign Up</Button>
            </Form>
        </Card.Body>
    </Card>

    <div className = "w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
    </div>

    
    </>
    
  )
}

export default RegisterPage


// import {useState, useEffect} from 'react';

// import CharityRegistration from "./charityRegistration";
// import DonorRegistration from "./donorRegistration";

// function RegisterPage(props){

//     const [state, setState] = useState("donor");

//   function loginInstead(){
//       props.setIsRegistered(true);
//   };
  
//     return (
//       <div>
//         <h3>Registering as a {state}</h3>
//         { (state=="donor") ?
//             <>
//             <DonorRegistration />
//             <button onClick={()=>setState("charity")}>Register As Charity</button>
//             </>
//           : <>
//             <CharityRegistration />
//             <button onClick={()=>setState("donor")}>Register As A Donor</button>
//             </>

//         }
//         <button onClick={loginInstead}>Login Instead</button>
//       </div>
//     );
// }

// export default RegisterPage;