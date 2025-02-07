import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'

const PaginationControls = () => {

  // const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams() 
  const page = Number(searchParams.get('page')) || 1

  return (
    <div className='flex gap-5'>

      <Button
      onClick={() => page > 0 && setSearchParams({ page: `${Number(page) - 1}` })}
      className={`
      "bg-gradient-to-r from-green-500/30 to-blue-500/30 hover:from-green-600/30 hover:to-blue-600/30"
      text-white border border-white/30 w-[100px]`}
    >
        Previous
    </Button>

    <Button
    onClick={() => page > 0 && setSearchParams({ page: `${Number(page) + 1}` })}
    // onClick={() => navigate(`/?page=${Number(page) + 1}`)}
    className={`
      "bg-gradient-to-r from-green-500/30 to-blue-500/30 hover:from-green-600/30 hover:to-blue-600/30"
      text-white border border-white/30 w-[100px]`}
    >
        Next
    </Button>

    </div>
  )
}

export default PaginationControls
