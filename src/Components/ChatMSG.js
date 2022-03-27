import React, { useState } from 'react'
import "./ChatMSG.css";
export default function ChatMSG({sendmsg}){
    const [msg,setmsg]=useState("");
    const handleMsg=(e)=>{
      setmsg(e.target.value)
      console.log(msg)
    }
    const sendMSg=(e)=>{
        e.preventDefault();
        console.log("clicked")
        if(msg.length>0){
            sendmsg(msg)
            setmsg('')
        }
    }
    return(
       <div className='msg-container1'>
           <form className='form-input' onSubmit={(e)=>sendMSg(e)}>
           <input type='text' className='in' placeholder='Type your message' value={msg} onChange={handleMsg}/>
           <button type='submit' className='btn1'>Send</button>
           </form>
           
       </div>
    )
}