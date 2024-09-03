import React, { useState } from 'react'
import '../form/index.css'
import { RxCross1 } from "react-icons/rx";
import axios from 'axios';


function Update({setShowPopup, popupContent}) {
   const [input,setInput] = useState(popupContent.task);
const updateTodo = () => {
    axios.put('http://localhost:3001/updatetodo',{id:popupContent.id, task: input})
    .then(result => console.log(result))
    .catch(err => console.log(err))
    setShowPopup(false)
}

  return (
    <div className="backdrop">
    <div className="popup">
      <RxCross1 className="cross" onClick={() => setShowPopup(false)} />
      <h1>Update ToDo</h1>

      <div className="popup__input_holder">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Update ToDo..."
        />
        <button onClick={()=> updateTodo()}>Update</button>
      </div>
    </div>
  </div>
  )
}

export default Update