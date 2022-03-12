/* Login Page 
We use the page to construct the dom elements used at login.
The elemets call the actions that appear in our firebase actions files.
Source: https://blog.logrocket.com/user-authentication-firebase-react-apps/
*/

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "src/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Stack from "@mui/material/Stack"
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {navigate('/')};
  }, [user, loading]);
  return (
    <Stack className="login" sx={{alignItems:"center", height:"90vh"}}>
        <h1>Login To Donatello</h1>
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
      </div>
      <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
    </Stack>
  );
}
export default Login;