import React, { useState,useEffect } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { loginRoute } from '../utils/Routes';
import {ToastContainer,toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

export default function Login(){
  const navigate=useNavigate();
  const [value,setValue]=useState({
    email:"",
    password:""
  })
  useEffect(()=>{
  if(localStorage.getItem('set-user'))
  {
    navigate("/chat")
  }
  },[])
    const handleSubmit=async(e)=>{
      
      e.preventDefault();
      if(handleValidation())
      {
      
        const {email,password}=value;
      const {data}=await axios.post(loginRoute,{
         email,
         password
      });
      if(data.status===false){
        
        toast.error(data.msg,toastOption)
      }
      if(data.status===true){
        localStorage.setItem("chat-user",JSON.stringify(data.findEmail))
        navigate("/chat")
      }
      }

    }
    const toastOption={
      position:'top-right',
      autoClose:3000,
      pauseOnHover:true,
      draggable:true
    }
    const handleValidation=()=>{
      const{email,password}=value;
      if(email==="")
      {
        toast.error("Email and password required",toastOption)
        return false;
      }
      else if(password==="")
      {
        toast.error("Email and password required",toastOption)
        return false;
      }
      return true;
    }
    const handleChange=(e)=>{
       setValue({...value,[e.target.name]:e.target.value}) 
    }
    return(
    <>
    <div className="FormContainer">
        <form action="" className='form' onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/768px-Facebook_Messenger_logo_2020.svg.png" alt="logo" />
            <h1>Messanger</h1>
          </div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register" className='btn'>Register.</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
    )
}