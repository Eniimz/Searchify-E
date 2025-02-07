
import { ChatInput } from "@/components/chat -page/Chat-input"
import Message from "@/components/chat -page/Message"
import { Sidebar } from "@/components/chat -page/Sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { pre, tr } from "framer-motion/client"
import React, { useEffect, useRef, useState } from "react"

export default function Page() {

  type prompt = {
    prompt: string
  }

  type productType = {

    id: string,
    title: string,
    description: string, 
    price: number, 
    rating: number, 
    imageUrl: string,
    url: string
    }

    type responseByAI = {
     allProducts: productType[],
     advice: string
    }

    type chatMessage = {
      message: string | React.ReactNode,
      isLoading: boolean,
      isUser: boolean
    }

    const [chatMessages, setChatMessages] = useState<chatMessage[]>([])
    const [products, setProducts] = useState([])
    const [responseReceived, setResponseReceived] = useState<{data: responseByAI, flag: boolean}>();

    const messageEndRef = useRef<HTMLDivElement | null>(null)

    const handleMessageSent = async (message: string) => {

      console.log("userMessage: ", message)

      const userMessage: chatMessage = {
        message,
        isLoading: false,
        isUser: true
      }

      setChatMessages((prevMessages) => [...prevMessages, userMessage])

      const loadingSkeletion: chatMessage = {
        message: <Skeleton />,
        isLoading: true,
        isUser: false
      }

      console.log("Setting response loading skeleton..")

      setChatMessages((prevMessages) => [...prevMessages, loadingSkeletion])

      try{
  
        const prompt: prompt = {
          prompt: message
        }

        const res = await fetch('http://localhost:3000/api/prompt', {
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify(prompt)
  
        })
  
        
        const data = await res.json()
  
        if(res.ok){
          console.log("ok res received")
        }
  
        if(data){
          console.log("The data in res: ", data)

          setChatMessages((prevMessages) => {
            // const updatedMessages = prevMessages.filter((message, i) => prevMessages.length - 1 !== i)
    
            let updatedMessages = [...prevMessages]
  
            updatedMessages[prevMessages.length - 1] = { message: data.advice, isLoading: false, isUser: false }  //updates last loading message
  
            return updatedMessages
  
          })
        }else{
          console.log("No data received")
        }
  
        
      }catch(err){
        // console.log(err.)
      }
    }

    useEffect(() => {
      if (messageEndRef.current) {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [chatMessages]);


    // useEffect(() => {

    //   if(responseReceived?.flag){

      //   setChatMessages((prevMessages) => {
      //     // const updatedMessages = prevMessages.filter((message, i) => prevMessages.length - 1 !== i)

      //     const { data } = responseReceived;

      //     let updatedMessages = [...prevMessages]

      //     updatedMessages[prevMessages.length - 1] = { message: data.advice, isLoading: false, isUser: false }  //updates last loading message

      //     return updatedMessages

      //   })
      // }

    // }, [responseReceived])

  return (
    <div className="flex h-screen bg-[#1a1f2d]">
      {/* Sidebar */}
      
      <Sidebar />
      {/* Main Content */}
      <div className="flex flex-col w-full relative">

        <div className="flex-1 overflow-y-auto p-4 pb-20">

          {
            chatMessages.map((chatMessage) => (
              <Message chatMessage = { chatMessage } />
            ))
          }

          <div ref = {messageEndRef} />  

        </div>
        
          {/* Chat Input */}
        <div className=" absolute bottom-0 right-0 border-t border-[#2a2f3d] bg-[#1a1f2d] p-4 w-full">
          <ChatInput onMessageSent = {handleMessageSent}/>
        </div>
    
      </div>        
      {/* </main> */}
    </div>
  )
}

