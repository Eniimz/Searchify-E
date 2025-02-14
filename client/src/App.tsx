import Compare from "./Pages/Compare"
import Home from "./Pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Chat from "./Pages/Chat"
import ProductDetails from "./Pages/ProductDetails"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Wishlist from "@/Pages/Wishlist"
import { div } from "framer-motion/client"
import AuthPage from "./Pages/Auth"



function App() {

  const queryClient = new QueryClient()

  return (
    
    <QueryClientProvider client={queryClient} >
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element = {<Home />}/>
          <Route path="/compare" element = {<Compare />} />
          <Route path="/chat/:id" element = {<Chat />} />
          <Route path="/products/:productTitle" element = {<ProductDetails />}  /> 
          <Route path="/wishlist" element = { <Wishlist /> } />
          <Route path="/sign-up" element = { <AuthPage /> } />
        </Routes>
      
      
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
