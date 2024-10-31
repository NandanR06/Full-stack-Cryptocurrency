import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useAuth } from '../AutoCotext.jsx';
import './Login.css'
const url = "http://localhost:5000"

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, SetPassword] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate();
  const protect = useNavigate();
  const handlUser = (e) => {
    setUsername(e.target.value);
  }
  const handelPassword = (e) => {
    SetPassword(e.target.value);
  }

  // protect('/')
  const handleSubmit = (e) => {
    e.preventDefault();
     axios.post(`${url}/Login`,{ username, password })
    .then((res) => {
        const { token } = res.data;
        login(token);
        localStorage.setItem('authToken', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUsername("");
        SetPassword("");
         protect('/login')
         
      })
      .catch(err => alert("please register"))
  }
  return (
    <div className="login">
      <div className="container2">
        <div className="Login">Login</div>
        <hr />
        <input type="text" placeholder='Please enter the name' className='in' value={username} onChange={handlUser} />
        <input type='password' placeholder=" password" className='psw' value={password} onChange={handelPassword} />
        <button className='btn2' onClick={handleSubmit}>Login</button>
        <button className='signup' onClick={() => { navigate('/Register') }}>Not a Member ? Sign up</button>
      </div>
    </div>
  )
}