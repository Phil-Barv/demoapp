 
import {useState, useEffect} from 'react';
import {Form, Button, Card} from 'react-bootstrap'
import SignUpCharity from "./SignUpCharity";
import SignUpDonor from "./SignUpDonor";

function RegisterPage(props){

    const [state, setState] = useState("donor");
   function loginInstead(){
       props.setIsRegistered(true);
   };
  
     return (
       <div>
         <h3>Registering as a {state}</h3>
         { (state==="donor") ?
             <>
             <SignUpCharity />
             <Button onClick={()=>setState("charity")}>Register As Charity</Button>
             <br></br>
             <br></br>
             </> 
             
           : <>
             <SignUpDonor />
             <Button onClick={()=>setState("donor")}>Register As A Donor</Button>
             <br></br>
             <br></br>
             </>

         }
         <Button onClick={loginInstead}>Login Instead</Button>
       </div>
     );
 }

 export default RegisterPage;