import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Sidebar({setChats, setChatInitiated,setReceiverId}) {
const navigate = useNavigate()
const [users, setUsers] = useState([])
    useEffect(() =>{
       const fetchUsers = async () => {
        try{
        const users = await axios.get("http://localhost:4000/chat/users",{
            headers:{
              'Authorization' : `Bearer ${window.localStorage.getItem('chat-token')}`
            },
           })
          
    setUsers(users.data.users)   
    }catch(error){
            navigate('/')
            console.log(error)}
    }
    fetchUsers()
    })

    const handleLogout = () => {
        window.localStorage.removeItem("chat-token")
        window.localStorage.removeItem("userId")
        navigate('/')
    }


    const startChat = async (id) =>{
        try {
            const response = await axios.get("http://localhost:4000/chat/message/read/"+id,
                {
                  headers:{
                    'Authorization' : `Bearer ${window.localStorage.getItem('chat-token')}`
                  },
                 }
              )
              setChats(response.data)
        } catch (error) {
            if(error.response.data.message === "not found"){
                setChats([])
            }
            console.log(error)
        }
     
        setChatInitiated(true)
        setReceiverId(id)
    }


  return (
    <div className='w-1/4 bg-black p-4 bg-opacity-70 relative'>
        
        <input type="text" placeholder="Search" className='w-full p-2 mb-4 border rounded'/>
        
        
        {users.length > 0 ?(
            <div className='space-y-4'>
                {users.map(user => (
                    <div className='flex items-center space-x-4 p-2 hover:bg-gray-300 cursor-pointer' onClick={() => startChat(user._id)}>
                        <img src={`http://localhost:4000/images/${user.image}`} alt="User Image"  className='w-10 h-10 rounded-full border'/>
                        <span className='text-white text-sm font-bold'>{user.username}</span>
                    </div>
                ))}
            </div>
        ):(
        
            <p className='text-white text-bold'>No Users</p>
        )}
        <button className='  bottom-1 right-1 left-1 rounded hover:bg-blue-700 bg-blue-500 text-white p-2 absolute' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Sidebar