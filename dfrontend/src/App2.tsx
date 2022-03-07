import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import {BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import DonorView from './containers/donor';
import Login from './components/login/Login';
import Register from './components/register/Register';

import './App.css';

const App2 = () => {

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
      <Route path="/login" element={<Login/>}>
      </Route>
      <Route path="/" element={<DonorView/>}>
      </Route>
      <Route path="/register" element={<Register/>}>
      </Route>
      <Route path="*" element={<DonorView/>}>
      </Route>
    </Routes>
  )
}

export default App2;