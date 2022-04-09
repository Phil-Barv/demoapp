
import {Form, Button, Card} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {login} from '../auth'



const Login=(props)=>{


    
    //const [logged] = useAuth();
    const {register,handleSubmit,reset,formState:{errors}}=useForm()
    const navigate = useNavigate()

     function registerInstead(){
         props.setIsRegistered(false);
     };


    const userLogin=(data)=>{
       console.log(data)

       const requestOptions={
           method:"POST",
           //url:"/token",
           headers:{
               'content-type':'application/json'
           },
           body:JSON.stringify(data)
       }
        
       fetch('/auth/login',requestOptions)
       .then(res=>res.json())
       .then(data=>{
           console.log(data.access_token)
           //props.setToken(data.access_token)
           
           if (data.access_token){

            console.log("access token is", data.access_token)

            login(data.access_token)
            
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
                <Button onClick={registerInstead}>Register</Button>
                <Form.Group>
                    <small>Do not have an account? <Link to='/signupdonor'>Create an account as Donor</Link></small>
                    <br></br>
                    <small>Do not have an account? <Link to='/signupcharity'>Create an account as Charity</Link></small>
                </Form.Group>
                <br/>


                <Button onClick={handleSubmit(userLogin)} className = "w-100" type  = "submit">Login</Button>
            </Form>
        </Card.Body>
    </Card>
  )
}

export default Login