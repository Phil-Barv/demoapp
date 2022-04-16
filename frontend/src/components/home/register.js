import {useState, useEffect} from 'react';

import CharityRegistration from "./charityRegistration";
import DonorRegistration from "./donorRegistration";
import APIService from '../api'


function RegisterPage(props){

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

  function loginInstead(){
      if (!formData.name.error & !formData.email.error & !formData.password.error){
        props.setIsRegistered(true);
      }
  };

    return (
      <div  id="main_container">
        <h2>Registering as a {user}</h2>
        <form>
          <input onChange={handleChange} 
                type="name"
                text={formData.name.value} 
                name="name" 
                placeholder={user=="Donor"?"username":"Organization Name" }
                value={formData.name.value} />
          <input onChange={handleChange} 
                type="email"
                text={formData.email.value} 
                name="email" 
                placeholder="Email" 
                value={formData.email.value} />
          <input onChange={handleChange} 
                type="password"
                text={formData.password.value} 
                name="password" 
                placeholder="Password" 
                value={formData.password.value} />
            <button onClick={register}>Submit</button>
        </form>
        { (user=="Donor")
          ? <button onClick={()=>setUser("Charity")} id='register'>Register As Charity</button>
          : <button onClick={()=>setUser("Donor")} id='register'>Register As Donor</button>
        }
        <button onClick={loginInstead} id='submit'>Login Instead</button>
      </div>
    );
}

export default RegisterPage;