import { Home, History, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Sidebar() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)


    return (
    <div
        className={`${
          isSidebarOpen ? "w-64" : "w-[60px]"
        } transition-all duration-300 ease-in-out border-r border-[#2a2f3d] bg-[#1a1f2d] flex flex-col justify-center items-center py-4 gap-2`}
      >
        <div className="mb-4 flex items-center justify-center w-full">
          {isSidebarOpen ? (
            <span className="font-bold text-xl bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] bg-clip-text text-transparent">
              Searchify
            </span>
          ) : (
            <span className="text-2xl font-bold bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] bg-clip-text text-transparent">
              S
            </span>
          )}
        </div>

        <button className={`
            ${
                isSidebarOpen ? "justify-start" : "justify-center"
            }
            p-2 rounded-lg hover:bg-[#2a2f3d] flex items-center w-full text-gray-300 transition-colors`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          {isSidebarOpen && <span className="ml-2">Home</span>}
        </button>

        <button className = {`
            ${
                isSidebarOpen ? "justify-start" : "justify-center"
            }
            p-2 rounded-lg hover:bg-[#2a2f3d] flex items-center w-full text-gray-300 transition-colors`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          {isSidebarOpen && <span className="ml-2">History</span>}
        </button>

        <button className="mt-auto p-2 rounded-lg hover:bg-[#2a2f3d] flex items-center w-full text-gray-300 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          {isSidebarOpen && <span className="ml-2">Messenger</span>}
        </button>

        {/* Toggle button */}
        <button
          onClick={toggleSidebar}
          className="mt-4 p-2 rounded-lg hover:bg-[#2a2f3d] text-gray-300 transition-colors"
        >
          {isSidebarOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          )}
        </button>
      </div>
  )
}

