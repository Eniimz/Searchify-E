//@ts-nocheck

import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import { useSocket } from '../socket-provider'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useDispatch, useSelector } from 'react-redux'
import { setPrefetchCompleted } from '@/redux/prefetchSlice'

type PaginationControlsProps = {
  setSelectedProducts: ([]: []) => void
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ setSelectedProducts }) => {

  const location = useLocation() //for when coming back from 
  const dispatch = useDispatch()

  // const { socket, isConnected } = useSocket()


  const [searchParams, setSearchParams] = useSearchParams() 
  const page = Number(searchParams.get('page')) || 1

  const { prefetchCompleted } = useSelector(state => state.prefetch)
  // const [prefetchCompleted, setPrefetchCompleted] = useState(false)

  const handleNext = () => {
    
    page > 0 && setSearchParams({ page: `${Number(page) + 1}` })
    dispatch(setPrefetchCompleted(false))
    setSelectedProducts([])
  }

  const handlePrevious = () => {
    page > 0 && setSearchParams({ page: `${Number(page) - 1}` })
    setSelectedProducts([])

  }

  // useEffect(() => {

  //   socket.on('check', (data) => {
  //     console.log("the check socket: ", data)
  //   })

  //   socket.on('prefetchingCompleted', data => {

  //     // setPrefetchCompleted(true)
  //     console.log("The socket data received: ", data)
  //   })

  // }, [socket])

  useEffect(() => {

  }, [location])

  return (
    <div className='flex gap-5 '>

      <Button
      disabled = {page === 1}
      onClick={handlePrevious}
      className={`
      "bg-gradient-to-r from-green-500/30 to-blue-500/30 hover:from-green-600/30 hover:to-blue-600/30"
      text-white border border-white/30 w-[100px]`}
    >
        Previous
    </Button>

     {/* <div className='rounded-md relative'> */}
          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild> */}
                  {/* <div className='absolute w-full h-full cursor-pointer'></div> */}
                  <div>
                  <Button
                  disabled = {page === 3 }
                  onClick={handleNext}
                  className={`
                    "bg-gradient-to-r from-green-500/30 to-blue-500/30 hover:from-green-600/30 hover:to-blue-600/30"
                    text-white border border-white/30 w-[100px]`}
                  >
                      Next
                  </Button>
                  </div>
              {/* </TooltipTrigger>
              <TooltipContent>
                <p>{prefetchCompleted ? 'Go next' : 'Please wait...'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}

          
      {/* </div>    */}
    </div>
  )
}

export default PaginationControls
