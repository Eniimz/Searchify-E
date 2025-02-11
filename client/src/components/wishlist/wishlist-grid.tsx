
import { useState } from "react"
import { motion } from "framer-motion"
import WishlistItem from "./wishlist-item"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react"

const items = [
  {
    id: 1,
    name: "TechPro Ultrabook X14",
    price: 799.99,
    specs: {
      display: '14" 1080p',
      ram: "6GB DDR4",
      storage: "64GB+128GB",
      processor: "Intel Core",
    },
  },
  {
    id: 2,
    name: "TechPro Ultrabook X15",
    price: 899.99,
    specs: {
      display: '15" 1080p',
      ram: "8GB DDR4",
      storage: "128GB+256GB",
      processor: "Intel Core i5",
    },
  },
  {
    id: 3,
    name: "TechPro Ultrabook X16",
    price: 999.99,
    specs: {
      display: '16" 1440p',
      ram: "16GB DDR4",
      storage: "256GB+512GB",
      processor: "Intel Core i7",
    },
  },
]

export default function WishlistGrid() {
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const [isCompareMode, setIsCompareMode] = useState(false)

  const toggleItemSelection = (id: number) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-white">Featured Items</h2>
        <div className="flex gap-4">
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="bg-gray-900/60 border-gray-700">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="bg-gray-900/60 border-gray-700">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button 
          className={`bg-gradient-to-r from-green-600/30 to-blue-600/30"
          text-white border border-white/30`}
          disabled={selectedItems.length === 0}
        >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Compare ({selectedItems.length})
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item, index) => (
          // <motion.div
          //   key={item.id}
          //   initial={{ opacity: 0, y: 20 }}
          //   animate={{ opacity: 1, y: 0 }}
          //   transition={{ duration: 0.4, delay: index * 0.1 }}
          // >
            <WishlistItem
              item={item}
              isSelected={selectedItems.includes(item.id)}
              onToggleSelect={() => toggleItemSelection(item.id)}
            />
          ))}
      </div>
    </div>
  )
}

{/* </motion.div> */}
