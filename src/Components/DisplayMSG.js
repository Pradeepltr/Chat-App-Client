import React,{useEffect,useRef} from 'react';
import "./DisplayMSG.css";

import { v4 as uuidv4 } from "uuid";

export default function DisplayMSG({currMsg}){
    const scrollRef=useRef();
   
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour: "smooth"})
    },[currMsg])
    return(
        <>
        <div className='display-main'>
            {
                currMsg.map((m)=>{
                    
                    return(
                       
                        <>
                       <div ref={scrollRef} key={uuidv4()}>
                        <div
                className={`${
                  m.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{m.message}</p>
                </div>
              </div>
              </div>
                        </>
                    )
                })
            }
        </div>
        
        </>
    )
}