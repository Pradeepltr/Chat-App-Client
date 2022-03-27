import React from 'react';
import { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import "./Contact.css";

export default function Contact({contact,currentUser, changeChat}){
    const navigate=useNavigate()
   const [currentUserName,setCurrentUserName]=useState(undefined)
   const [currSelected,setcurrSelected]=useState(undefined)
    useEffect(()=>{
        console.log(contact)
       if(currentUser){
           setCurrentUserName(currentUser.username);
       }
    },[currentUser])
    const Logout=()=>{
        localStorage.clear();
        navigate("/login")
    }
    const CurrentChat=(index,contact)=>{
        setcurrSelected(index);
        changeChat(contact)
    }
    return(
        <>
          <div className='Main'>
          <div className='contacts-display'>
              {
                  contact.map((data,index)=>{
                      return(
                          <>
                          <div className={`contact ${index===currSelected ?"selected":""}`} key={index} onClick={()=>CurrentChat(index,data)}>
                              <div className='user'>
                                  <h3>{data.username}</h3>
                              </div>
                          </div>
                          </>
                      )
                  })
              }
          </div>
          
          <div className='currentUser'>
              <h2>{currentUserName}</h2>
              <button type='button' className='logout' onClick={Logout}>Logout</button>
          </div>
          </div>
          
        </>
       
    )
}