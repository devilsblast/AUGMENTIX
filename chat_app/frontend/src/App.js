import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import io from "socket.io-client"

const socket = io.connect("http://localhost:4000")


function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/chat' element={<Chat socket={socket}/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
