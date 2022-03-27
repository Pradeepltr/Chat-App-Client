import React from 'react'
import "./ChatHome.css"

export default function ChatHome({currentUser}){
    console.log(currentUser.username)
    return(
        <>
        <div className='home-container'>
            <img src='https://3.files.edl.io/9554/21/08/18/224351-9e72864e-5f6e-4c41-a9a8-f0f031040bcc.gif' />
            <h2>{currentUser.username}</h2>
        </div>

        </>
    )
     
}