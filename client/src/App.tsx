import ComparePage from "./Pages/Compare"
import Home from "./Pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Chat from "./Pages/Chat"
import ProductDetails from "./Pages/ProductDetails"



function App() {

  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element = {<Home />}/>
        <Route path="/compare" element = {<ComparePage />} />
        <Route path="/chat/:id" element = {<Chat />} />
        <Route path="/product/detail/:productId" element = {<ProductDetails />}  />
      </Routes>
    
    
    </BrowserRouter>
  )
}

export default App
