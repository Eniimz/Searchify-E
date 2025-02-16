//@ts-nocheck

import Compare from "./Pages/Compare"
import Home from "./Pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Chat from "./Pages/Chat"
import ProductDetails from "./Pages/ProductDetails"
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import WishlistPage from "./Pages/Wishlist"
import { div } from "framer-motion/client"
import AuthPage from "./Pages/Auth"
import { SocketProvider } from "./components/socket-provider"
import NotFound from "./Pages/Not-Found"



function App() {


  // const queryClient = new QueryClient()

  return (
    
    <SocketProvider>
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element = {<Home />}/>
          <Route path="/compare" element = {<Compare />} />
          <Route path="/products/:productTitle" element = {<ProductDetails />}  /> 
          <Route path="/wishlist" element = { <WishlistPage /> } />
          <Route path="/sign-up" element = { <AuthPage /> } />
          {/* <Route path="/Not-Found" element = { <NotFound /> } */}
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  )
}

export default App
