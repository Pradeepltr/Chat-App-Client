import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import "./Register.css";
import { useEffect,useState } from 'react';
import {ToastContainer,toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { registerRoute } from '../utils/Routes';

export default function Register(){
    const navigate=useNavigate();
    const [value,setValue]=useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const ToastOption={
        position:'top-right',
        autoClose:5000,
        pauseOnHover:true,
        draggable:true
    }
    useEffect(()=>{
      if(localStorage.getItem('chat-user'))
      {
        navigate("/chat")
      }
    })
    const HandleValidation=()=>{
        const{username,password,confirmPassword,email}=value;
        if(password!=confirmPassword)
        {
            toast.error("Password and ConfirmPassword not matched",ToastOption);
            return false;
        }
        else if(username.length<=4)
        {
            toast.error("username must be greater than 4 Character",ToastOption);
            return false;
        }else if(email==="")
        {
            toast.error("Please fill email",ToastOption)
            return false;
        }else if(password.length<5)
        {
            toast.error("Password length must be greater than 4",ToastOption)
            return false;
        }
        return true;
    }
    const handleChange=(e)=>{
        setValue({...value, [e.target.name]: e.target.value})
        console.log(value)

    }
    const handleSubmit=async(e)=>{
      e.preventDefault();
    //   HandleValidation();
    if(HandleValidation()){
        const {username,email,password}=value;
      const {data}=await axios.post(registerRoute,{
          username,
          email,
          password
      })
      if(data.status===false){
          toast.error(data.msg,ToastOption);
      }
      if(data.status===true){
          // localStorage.setItem("chat-user",JSON.stringify(data.user))
          navigate("/login");
      }
    }
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
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login" className='btn'>Login.</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
    )
}