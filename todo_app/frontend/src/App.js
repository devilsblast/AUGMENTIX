import logo from './logo.svg';
import './App.css';
import Todo from './components/todo';
import Update from './components/updatetodo/update';
import { useState } from 'react';

function App() {

  const[showPopup, setShowPopup] = useState(false);
  const[popupContent, setPopupContent] = useState({});
  return (
    <div>
    <div className="App">
     <Todo setShowPopup={setShowPopup} setPopupContent={setPopupContent}/>
    </div>
        {showPopup && <Update setShowPopup={setShowPopup} popupContent={popupContent}/>}
    </div>
  );
}

export default App;
