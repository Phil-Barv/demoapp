import {useState, useEffect} from 'react';

import CharityRegistration from "./charityRegistration";
import DonorRegistration from "./donorRegistration";

function RegisterPage(props){

    const [state, setState] = useState("donor");

  function loginInstead(){
      props.setIsRegistered(true);
  };
  
    return (
      <div>
        <h3>Registering as a {state}</h3>
        { (state=="donor") ?
            <>
            <DonorRegistration />
            <button onClick={()=>setState("charity")}>Register As Charity</button>
            </>
          : <>
            <CharityRegistration />
            <button onClick={()=>setState("donor")}>Register As A Donor</button>
            </>

        }
        <button onClick={loginInstead}>Login Instead</button>
      </div>
    );
}

export default RegisterPage;