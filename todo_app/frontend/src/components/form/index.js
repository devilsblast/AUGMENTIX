import React, {  useState } from 'react'
import './index.css';
import axios from 'axios';

function Form() {
  const [task, setTask] = useState('')
  const handleAdd = () =>{
    axios.post('http://localhost:3001/add',{task: task})
    .then(result => console.log(result))
    .catch(err => console.log(err))
  }

  return (
    <div className='form'>
        <input type='text' className='in' placeholder='Enter Task' onChange={(e) => setTask(e.target.value)} />
    <button className='but'type='button' onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Form