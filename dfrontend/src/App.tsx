/* Main router for the app
  Besides routing the user depending on the url that gets navigated to,
  We also check if the user exists. If the user has an uid, then we allow him to access the app.
  However, if he does not, then we redirect him/her/they to the login page.
*/

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import { Routes, Route, useNavigate } from 'react-router-dom';

import DonorView from './containers/donor';

import Login from './components/login/Login';
import Register from './components/register/Register';

import './App.css';

const App = () => {

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    if (loading) return;
    if (!user) {navigate('/login')};
    if (user) {fetchUserName()};
  }, [user, loading]);

  return(
    <Routes>
      <Route path="/login" element={<Login/>}> </Route>
      <Route path="/register" element={<Register/>}> </Route>
      <Route path="/edit-profile" element={<DonorView view="edit_profile" />}> </Route>
      <Route path="/my-profile" element={<DonorView view="your_donations" />}> </Route>
      <Route path="/browse" element={<DonorView view="project_browser" />}> </Route>
      <Route path="/" element={<DonorView view="project_browser" />}> </Route>
      <Route path="*" element={<DonorView view="project_browser" />}> </Route>
    </Routes>
  )
}

export default App;