import {useState, useEffect} from 'react';

import CharityRegistration from "./charityRegistration";
import DonorRegistration from "./donorRegistration";

function RegisterPage(props){

    const [state, setState] = useState("Donor");

  function loginInstead(){
      props.setIsRegistered(true);
  };
  
    return (
      <div  id="main_container">
        <h2>Registering as a {state}</h2>
        { (state=="Donor") ?
            <>
            <DonorRegistration className='login-input'/>
            <button onClick={()=>setState("Charity")} id='register'>Register As Charity</button>
            </>
          : <>
            <CharityRegistration />
            <button onClick={()=>setState("Donor")} id='register'>Register As Donor</button>
            </>

        }
        <button onClick={loginInstead} id='submit'>Login Instead</button>
      </div>
    );
}

export default RegisterPage;