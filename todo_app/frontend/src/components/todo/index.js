import React, { useEffect, useState } from 'react'
import './index.css';
import { BsCircle,BsCircleFill,  BsFillTrashFill } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";
import Form from '../form';
import axios from 'axios';
import Update from '../updatetodo/update';





function Todo({setShowPopup, setPopupContent}) {
const [todos, setTodos] = useState([])
const [change, setChange] = useState(false)
const updateTodo = (id, task) =>{
  setPopupContent({id,task})
  setShowPopup(true)
}

useEffect(() => {
  axios.get('http://localhost:3001/get')
  .then(result =>setTodos(result.data)

  )
  .catch(err => console.log(err))
},[todos])

const handleEdit = (id,done) => {
  

  axios.put(`http://localhost:3001/update`,{
    id:id,
    done:done,
  })
  .then(result => {
                    console.log(result)
                  }
        )
          .catch(err => console.log(err)) 
}

const handleDelete = (id) =>{
  axios.delete('http://localhost:3001/delete/'+id)
  .then(result => console.log(result))
          .catch(err => console.log(err)) 
}




  return (
    <div className='Todo'>
        <h1>List of Todos</h1>
        <Form />
        {
          todos.length === 0 
          ? 
          <div> NO RECORDS</div> 
          : 
          todos.map(todo => 
            (
            
             
              (<div className='task'>
                <div className='checkbox' onClick={() => handleEdit(todo._id,todo.done)}>
                {todo.done ? <BsCircleFill className='icon' />:<BsCircle className='icon' />}
                
                <p className={todo.done ?"line_through":""}>{todo.task}</p>
              </div>
              <div> 
              <span><TbEdit className='icon' onClick={() => updateTodo(todo._id, todo.task)} /></span>
                <span><BsFillTrashFill  className='icon' onClick={() => handleDelete(todo._id)}/></span>
              </div>
              </div>) 
            
            ))
        } 
    </div>
  )
}

export default Todo