import React, { useEffect, useState } from 'react'
import Model from '../components/Model'
import Register from '../components/Register'
import Login from '../components/Login'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Home() {
  const [isModelOpen, setIsModelOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(true)

  const openSignup = () => {
    setIsModelOpen(true)
    setIsLogin(false)
  } 

  const openLogin = () => {
    setIsModelOpen(true)
    setIsLogin(true)
  } 
const navigate = useNavigate();
  useEffect(() => {
    const verifyUser = async() =>{
       try{
       const response = await axios.get('http://localhost:4000/chat/user/verify',{
        headers:{
          'Authorization' : `Bearer ${window.localStorage.getItem('chat-token')}`
        },
       });
       
           if(response.data.msg === "success"){
               navigate('/chat')
           }
   
       }catch(error){
           console.log(error)
       }
    }   
    verifyUser() 
   },[])

  return (
   
        <div className='flex items-center justify-center h-screen bg-gray-100'>
            <div  className='bg-orange-400 bg-cover w-2/4 h-[calc(100vh-60px)] rounded-lg flex items-center justify-center'>
                <div className='text-center'>
                  <h2 className='text-6xl py-3 bg-white bg-opacity-80 font-bold text-gray-700 rounded-lg font-Anek'>Chat app</h2>
                  <button className='p-3 hover:bg-blue-800 rounded-lg mt-2 bg-blue-600 text-white text-3xl font-bold'
                  onClick={() => setIsModelOpen(true)}>Login/Register</button>
                </div>
                
            </div>
            <Model isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen}>
              {isLogin ? <Login openSignup={openSignup}/> :  <Register openLogin={openLogin}/>}
             
            </Model>
        </div>
  
  )
}

export default Home