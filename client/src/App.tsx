import ComparePage from "./Pages/Compare"
import Home from "./Pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Chat from "./Pages/Chat"



function App() {

  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element = {<Home />}/>
        <Route path="/compare" element = {<ComparePage />} />
        <Route path="/chat/:id" element = {<Chat />} />
      </Routes>
    
    
    </BrowserRouter>
  )
}

export default App
