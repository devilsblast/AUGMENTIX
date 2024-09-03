import axios from 'axios';
import React, { useState } from 'react' 

function Form({receiverId, setChats, chats}) {

  const [message,setMessage] = useState("");
  const userId = window.localStorage.getItem("userId")

  const sendMessage = async(e) =>{
    e.preventDefault()
      try {
        const response = await axios.post("http://localhost:4000/chat/message/send/"+receiverId,{content: message},
          {
            headers:{
              'Authorization' : `Bearer ${window.localStorage.getItem('chat-token')}`
            },
           }
        )
        setChats([...chats,{content: message, sender: userId}])

      } catch (error) {
        console.log(error)
      }
  }

  return (
    <div className='p-4 fixed absolute bottom-0 right-0 left-0 bg-whtie-600 bg-opacity-20'>
     <form onSubmit={sendMessage} className='flex items-center'>
      <input type="text"
      value={message}
      placeholder="Type your message"
      onChange={(e) => setMessage(e.target.value)}
      className='w-full p-2 border rounded-l-lg' />
      
      <button type='submit' className='p-2 bg-blue-500 text-white rounded-r-lg'>Send</button>
      </form>
    </div>
  )
}

export default Form