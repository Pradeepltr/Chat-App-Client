import React, { useEffect, useState,useRef } from 'react'
import "./ChatContainer.css";
import ChatMSG from './ChatMSG';
import DisplayMSG from './DisplayMSG';
import axios from 'axios';
import { getMsg, sendMsg } from '../utils/Routes';


export default function ChatContainer({currChat,currentUser,socket}){
  const scrollRef=useRef();
    const [currMsg,setcurrMsg]=useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null);
    useEffect(async()=>{
        if(currChat)
        {
        const response=await axios.post(getMsg,{
            from:currentUser._id,
            to:currChat._id,
        
        });
        setcurrMsg(response.data);
        console.log(currMsg)
    }
    },[currChat])
    const sendmsg=async(msg)=>{
     await axios.post(sendMsg,{
         from:currentUser._id,
         to:currChat._id,
         message:msg
     })
     socket.current.emit("send-msg",{
         to:currChat._id,
         from:currentUser._id,
         message:msg,
     });
     const msgs=[...currMsg];
     msgs.push({fromSelf:true, message:msg});
     setcurrMsg(msgs)
    }
    useEffect(()=>{
        if(socket.current){
            socket.current.on("msg-recieve",(msg)=>{
                setArrivalMessage({fromSelf:false,message:msg})
            })
        }
    })
    useEffect(()=>{
        console.log(arrivalMessage)
        arrivalMessage &&setcurrMsg([...currMsg,arrivalMessage])
    },[arrivalMessage])
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour: "smooth"})
    },[currMsg])
   
    return(
        <>
        {
      currChat &&  (
        <div className='Main-chat-container'>
            <div className='chat-name'>
                <h1>{currChat.username}</h1>
            </div>
            <div className='msg'>
                <DisplayMSG currMsg={currMsg} />
            </div>
            <div className='input-msg'>
                <ChatMSG sendmsg={sendmsg} />
            </div>
        </div>
       
        )
        }
        </>
    )
}