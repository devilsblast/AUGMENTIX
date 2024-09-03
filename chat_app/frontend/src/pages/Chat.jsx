import React, {  useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Form from '../components/Form'




function Chat({socket}) {
 const[chatInitiated, setChatInitiated] = useState(false)
 const [chats, setChats] = useState([])
 const [receiverId, setReceiverId] = useState();
 const userId = window.localStorage.getItem("userId")




useEffect(() => {
    socket.emit('join',userId)
    const handleNewMessages = (message) => {
        if(receiverId === message.sender){
            setChats(state => [...state,{sender: message.sender, content: message.content}])
        }
        
    }
socket.on('newMessage', handleNewMessages)

return () =>{
    socket.off('newMessage', handleNewMessages)
}
},[socket, receiverId])




    return (
        <div className='flex items-center justify-center h-screen bg-gray-100'>
            <div  className='bg-red-400 bg-cover w-2/4 h-[calc(100vh-60px)] rounded-lg flex '>
            <Sidebar setChatInitiated={setChatInitiated}
            setChats={setChats}
            
            setReceiverId={setReceiverId}/>

<div className='w-3/4 bg-white flex flex-col bg-opacity-20 relative'>

            {chatInitiated ? (
                <>
                    <div className='overflow-y-auto mb-20'>
                        {chats &&
                        chats.map((chat,index) => (
                            <div key={index} className={`flex px-4 ${
                                chat.sender === userId ? "justify-end" : "justify-start"
                            }`}>
                                <div
                                className={`p-2 my-2 rounded ${chat.sender === userId 
                                    ? "bg-blue-500 text-white"
                                    : "bg-black text-white"
                                }`}>
                                    {chat.content}
                                    </div>
                                    </div>
                        ))}
                    </div>
                <Form receiverId={receiverId}
                 setChats={setChats}
                 chats={chats}
                 />
                </>
            ) :(
                <div className='flex justify-center items-center h-full'>
                    <h2 className='text-3xl py-3 bg-white bg-opacity-80 font-bold text-gray-700 rounded-lg font-Anek'>😊 Start Chat 😉</h2>
                </div>
            )}
            </div>
            </div>  
            </div>  
  )
}

export default Chat