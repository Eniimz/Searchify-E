import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'

type PaginationControlsProps = {
  setSelectedProducts: ([]: []) => void
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ setSelectedProducts }) => {

  // const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams() 
  const page = Number(searchParams.get('page')) || 1

  const handleNext = () => {
    
    page > 0 && setSearchParams({ page: `${Number(page) + 1}` })
    setSelectedProducts([])
  }

  const handlePrevious = () => {
    page > 0 && setSearchParams({ page: `${Number(page) - 1}` })
    setSelectedProducts([])

  }

  return (
    <div className='flex gap-5'>

      <Button
      onClick={handlePrevious}
      className={`
      "bg-gradient-to-r from-green-500/30 to-blue-500/30 hover:from-green-600/30 hover:to-blue-600/30"
      text-white border border-white/30 w-[100px]`}
    >
        Previous
    </Button>

    <Button
    onClick={handleNext}
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
