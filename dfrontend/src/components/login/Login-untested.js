import {useRef, useState, useEffect} from 'react'; 

const Login = () => {

    const useRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [password, setPassword] = setState('');
    const[errorMessage, setErrorMessage] = useState('');
    const [successState, setSuccessState] = setState(false);

    useEffect (() => {

        userRef.current.focus(); 

    }, [])

    useEffect(() => {

        setErrorMessage('');

    }, [user, [password]])

    const handleSubmit = async (e) => {
        e.preventDefault();

    }


    return (

        <section>
            <p ref = {errRef} className = {errorMessage? "Error Message": "Off Screen"} aria-live = "assertive">
                {errorMessage}
            </p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>

                <label htmlFor = "username"> Username:</label>
                <input
                    type  = "text"
                    id = "username"
                    ref = {userRef}
                    autoComplete = "off"
                    onChange={(e) => setUser(e.target.value)}
                    value = {user}
                    r
                
                />

                <label htmlFor = "password"> Password:</label>

                <input
                    type  = "password"
                    id = "password"
                    onChange={(e) => setPassword(e.target.value)}
                    value = {password}
                    r
                
                />  

                <button>
                    Sign In
                </button>            
                
                
            </form>

            <p>
                You don't have an account yet?<br/>
                <span className = "line">
                    <a href = ""> Sign Up</a>


                </span>

            </p>



        </section>
    )
}