import React from 'react';
import {BrowserRouter,Route,Routes,Switch} from 'react-router-dom'
import Login from './Pages/Login';
import Register from './Pages/Register';
import Chat from './Pages/Chat';

export default function App(){
  return(
    
   <BrowserRouter>
   
  
   <Routes>
     <Route path='/' element={<Login />} />
     <Route path='/register' element={<Register />} />
     <Route path='/chat' element={<Chat />} />
     <Route path='/login' element={<Login />} />

   </Routes>
 
   
   </BrowserRouter>
   
  )
}