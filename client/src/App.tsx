import ComparePage from "./Pages/Compare"
import Home from "./Pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Chat from "./Pages/Chat"
import ProductDetails from "./Pages/ProductDetails"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"



function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient} >
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element = {<Home />}/>
          <Route path="/compare" element = {<ComparePage />} />
          <Route path="/chat/:id" element = {<Chat />} />
          <Route path="/products/:productId" element = {<ProductDetails />}  />
        </Routes>
      
      
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
