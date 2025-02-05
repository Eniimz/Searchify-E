import { useState } from "react"
import { Button } from "../ui/button"



type ChatInputProps = {
  onMessageSent: (message: string) => void
}



export function ChatInput({ onMessageSent}: ChatInputProps) {

  const [input, setInput] = useState("")

  const handleMessageSent = (message: string) => {
    onMessageSent(message)

  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === "Enter"){
      event.preventDefault()
      handleMessageSent(input)
    }
  }

  return (
    // <div className="">
          <div className="max-w-3xl mx-auto flex gap-2 items-center">
            <button className="p-2 hover:bg-[#2a2f3d] rounded-lg text-gray-300 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            </button>
            <input
              className="flex-1 rounded-lg border-0 bg-[#2a2f3d] px-4 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] transition-all"
              placeholder="Ask follow-up..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                boxShadow: "0 0 0 1px rgba(139, 92, 246, 0.05)",
              }}
            />
            <Button 
            onClick={() => {handleMessageSent(input)}}
            className="p-2.5 bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white rounded-lg hover:opacity-90 transition-opacity">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </Button>
          </div>
        // </div>
  )
}

