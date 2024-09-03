import axios from 'axios'
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

function Login({openSignup}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:4000/chat/user/login',{username, password})
            if(response.data.msg === "success"){
                window.localStorage.setItem('chat-token', response.data.token)
                window.localStorage.setItem('userId', response.data.user._id)
                navigate('/chat')
            }
        }
        catch(err){
            console.log(err)
        }
    }

  return (
    <div>
        <h2 className='text-2xl font-bold mb-4'>Login</h2>
        <form  onSubmit={handleSubmit}>
        <div className='mb-4'>
            <label className='block test-gray-700'> Username:</label>
            <input type="text" className='w-full px-3 py-2 border' placeholder='Enter Username' onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className='mb-4'>
            <label className='block text-gray-800'> Password:</label>
            <input type="password" className='w-full px-3 py-2 border' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className='mb-4 flex items-center justify-between'>
            <label className='inline-flex  items-center'>
            <input type="checkbox" className='form-checkbox'/>
            <span className='ml-2 text-gray-700'>Remember Me</span>
            </label>
            <a href="#" className='text-red-800'> Forget Passoword</a>
        </div>
        <div className='mb-4'>
            <button type='submit' className='w-full bg-red-600 text-white py-2'>Login</button>
        </div>
        </form>
        <div className='text-center'>
            <span className='text-gray-700'>Don't Have an Account? </span>
            <button className='text-red-800' onClick={openSignup}>Sign Up</button>
        </div>
    </div>
  )
}

export default Login