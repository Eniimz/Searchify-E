import React from 'react'
import { Skeleton } from '../ui/skeleton'


type chatMessageType = {
      message: string | React.ReactNode,
      isLoading: boolean,
      isUser: boolean
  }

type MessageProps = {
  chatMessage: chatMessageType
}


const Message: React.FC<MessageProps> = ({ chatMessage }) => {
  return (
    
    
            <div className={`flex ${ chatMessage.isUser ? "justify-end" : "justify-start" } p-4`}>
                {
                chatMessage.isLoading ? 
                
                <Skeleton /> :
                
                <div className={`bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white rounded-lg px-4 py-2 
                ${ chatMessage.isUser ? "mr-96" : "ml-96" } max-w-[80%] shadow-lg max-w-[520px]`}>
                    { chatMessage.message }
                </div>
                }
            </div>
        
    
  )
}

export default Message
