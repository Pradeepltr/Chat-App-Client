import React, { useEffect, useState,useRef } from 'react'
import "./Chat.css";
import { AllUsersRoute, host } from '../utils/Routes';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Contact from '../Components/Contact'
import ChatHome from '../Components/ChatHome';
import ChatContainer from '../Components/ChatContainer';
import {io} from 'socket.io-client';


export default function Chat(){
  const socket=useRef();
    const navigate=useNavigate();
    const [currentUser,setCurrentUser]=useState(undefined);
    const[contact,setContact]=useState([])
    const [currChat,setcurrChat]=useState(undefined)
    const [Loaded,setLoaded]=useState(false);

    useEffect(()=>{
      if(!localStorage.getItem('chat-user'))
      {
       navigate("/login")
      }else{
          setCurrentUser(JSON.parse(localStorage.getItem('chat-user')))
          setLoaded(true)
      }
    },[])
    useEffect(()=>{
      if(currentUser){
        socket.current=io(host);
        socket.current.emit("add-user",currentUser._id)
      }
    })
    useEffect(async()=>{
      if(currentUser){
          const data=await axios.get(`${AllUsersRoute}/${currentUser._id}`);
          setContact(data.data);
      }
    },[currentUser])
    const chatChange=(chat)=>{
          setcurrChat(chat)
    }
    return(
    <>
   <div className='Container'>
     <div className='child-container'>
     <Contact contact={contact} currentUser={currentUser} changeChat={chatChange}/>
      {Loaded && currChat===undefined?(
      <ChatHome currentUser={currentUser} />):(
     
        <ChatContainer currChat={currChat} currentUser={currentUser} socket={socket}/>
      
      )}
     </div>
   </div>
    </>
    )
}