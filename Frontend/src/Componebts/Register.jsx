import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import './Register.css'
import { useNavigate } from 'react-router-dom';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const url = "https://cryptocurrency-3fh8.onrender.com"


export default function Register() {
  const [username, setUsername] = useState("");
  const [password, SetPassword] = useState("");
  const [data, setdata] = useState(false);
  const [cls, setCls] = useState(false);
  const [error, setError] = useState("");
  const login = useNavigate();

  const handlUser = (e) => {
    setUsername(e.target.value);
  }
  const handelPassword = (e) => {
    SetPassword(e.target.value);
  }
  const handelSubmit = (e) => {
    e.preventDefault();


    if (username === '' || password === '') {
      if (username === '')
        alert("Please enter the name");
      else if (password === '') {
        alert("please enter the password")
      }
    }
    else {
      console.log(username, password)

      axios.post(`${url}/Register`, { username, password })
        .then(res => {
          if (res.data.exists) {
            setError("user name is already existed")
            setCls(true);
            setdata(false)
          }
          else {
            setUsername("");
            SetPassword("");
            setdata(true);
             login('/')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  useEffect(()=>{
    const disableRightClick=(e)=>{
      e.preventDefault();
    }
     document.addEventListener("contextmenu",disableRightClick);
     return()=>{document.removeEventListener('contextmenu',disableRightClick)};
  },[])


  
  return (
    <div className='register'>
      <div className="container1">
        <div className='Register'>Register</div>
        <hr />
        <input
          type="text"
          placeholder='Please enter the name'
          className={cls ? "errregister" : "in"}
          onChange={handlUser}
          value={username}
          required />
        <div className='user-name'>{cls ? <><InfoOutlinedIcon />{error}</> : error}</div>


        <input
          type='text'
          placeholder=" password"
          className='psw'
          onChange={handelPassword}
          value={password}
          required
        />
        <div className='data'>{data ? <div>Register Succesfully</div> : <div></div>}</div>
        <button className='btn1' onClick={handelSubmit}>Register</button>
      </div>
    </div>
  )
}
