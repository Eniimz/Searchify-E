
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Loader from "@/components/loader";
import clsx from "clsx"
import ProductCard from "@/components/global/Product-card"
import { GitCompareArrows } from "lucide-react";
import {Product} from "../lib/types"
import PaginationControls from "@/components/global/Pagination-controls";
import { Link, useNavigate, useSearchParams } from 'react-router-dom'



export default function Home() {

  type prompt = {
    prompt: string,
    previousStore ?: 4 
  }



    // const products = [
    //   {
    //     title: 'Logitech G502 Performance Gaming Mouse',
    //     description: 'HERO 25K Sensor, 25,600 DPI, RGB, Adjustable Weights, 11 Programmable Buttons, On-Board Memory, PC / Mac',
    //     price: 44.99,
    //     rating: 4.6,
    //     image: 'https://m.media-amazon.com/images/I/11++B3A2NEL._SS200_.png',
    //     url: 'https://amazon.com/Logitech-G502-Performance-Gaming-Mouse/dp/B07GBZ4Q68/ref=sr_1_1?dib=eyJ2IjoiMSJ9.D51lWxt7OD5GPXMrCM-hnnHpwbQ5ea1aTLHft-lQuIl-kmXwBzdrjy57OsEMOjI4N-80uT-ie9iGtmHqJocIrt_NLD4y3E3qnGpJ1m_F3ahSIPt_ILMkP24K7pCaGMgGTWgT0fEfd9zQ1Vt3sPRmCfp6hR9qQFmB2_QoSqE7Qe-X-gUUQ8HO6PWawHDyb0OCR-kfQjcRe7ye5yCzQfZBcT9lX1HD-g54UkO1gR_-m-o.JfgqaGJvpMOY7SvYmooHuZEsvC5UExCXHg_eJ7P8mj8&dib_tag=se&keywords=gaming+mouse&qid=1738457675&sr=8-1'
    //   },
    //   {
    //     title: 'Redragon M612 Predator RGB Gaming Mouse',
    //     description: 'Programmable gaming mouse with software',
    //     price: 19.99,
    //     rating: 4.5,
    //     image: 'https://m.media-amazon.com/images/I/11++B3A2NEL._SS200_.png',
    //     url: 'https://amazon.com/Redragon-M612-Predator-Programmable-Software/dp/B08SJ5Z8JL/ref=sr_1_3'
    //   },
    //   {
    //     title: 'Razer Basilisk V3 Pro Wireless Gaming Mouse',
    //     description: 'Certified - Refurbished, 4.5 out of 5 stars, 9 product ratings',
    //     price: 85.88,
    //     rating: 5,
    //     image: 'https://i.ebayimg.com/images/g/z2gAAOSwFrBmZIGW/s-l140.webp',
    //     url: 'https://www.ebay.com/itm/387863605258'
    //   },
    //   {
    //     title: 'Logitech G Pro X SUPERLIGHT Wireless Gaming Mouse',
    //     description: 'Esports Grade Performance',
    //     price: 69.99,
    //     rating: 5,
    //     image: 'https://i.ebayimg.com/images/g/vhwAAOSwWohnGpIy/s-l140.webp',
    //     url: 'https://www.ebay.com/p/27052806029'
    //   }
    // ]

  const [ searchParams ] = useSearchParams()
  const page = Number(searchParams.get('page')) || 1

  const [products, setProducts] = useState<Product[] | []>([])
  const [input, setInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)

  const [isCompareMode, setCompareMode] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const productsRef = useRef<HTMLDivElement | null>(null)

  const flexOrGrid = clsx({

    'flex justify-center': products.length === 0,
    
    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6': products.length > 0
    
    })

    const handlePromptAndFetch = async (inputQuery: string) => {

      if(!inputQuery || inputQuery === '') return

      setSearchQuery(inputQuery)
      const prompt: prompt = {
        prompt: inputQuery
      }
  
      setLoading(true)

      try{
  
        const res = await fetch(`http://localhost:3000/api/prompt/?page=${page}`, {
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify(prompt)
  
        })
  
        
        const data = await res.json()
  
        if(res.ok){
          console.log("ok res received")
        }
  
        if(data){
          console.log("The data in res: ", data.allProducts)
          setProducts(data.allProducts) 
          setLoading(false)
        }else{
          console.log("No data received")
        }
  
        
      }catch(err){
        // console.log(err.)
        setLoading(false)
      }
      
    }


    const toggleCompareMode = () => {
      setCompareMode((prevValue) => !prevValue)
    }

    const handleSelectedProducts = (id: string) => {

      setSelectedProducts((prevProducts) => {
        if(prevProducts.length >= 2){
          return prevProducts.filter(p_id => p_id !== id) 
        }else{
          return [...prevProducts, id]
        }
      })

    }

    useEffect(() => {
          if (productsRef.current) {
            productsRef.current.scrollIntoView({ behavior: "smooth" });
          }
    }, [products]);


    useEffect(() => {

      if(!searchQuery) return

      const fetchProducts = async () => {
        await handlePromptAndFetch(searchQuery)
      }
      
      fetchProducts()

    }, [page])


  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="relative px-4 pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="relative container mx-auto max-w-6xl">
          <motion.h1
            className="text-center text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 text-transparent bg-clip-text pb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Transform Your Ideas
            <br />
            Into Reality with AI
          </motion.h1>
          <motion.p
            className="text-center text-gray-400 mt-6 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Generate stunning visuals and creative content with our advanced AI-powered platform
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="mt-12 max-w-xl mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative flex items-center gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-25" />
                <Input
                  type="text"
                  placeholder="Describe what you want to create..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="relative bg-gray-900/50 border-gray-700 text-gray-100 placeholder:text-gray-400 w-full backdrop-blur-sm"
                />
              </div>
              <Button 
              onClick={() => handlePromptAndFetch(input)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                Generate
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 pb-20">
        <div className="container mx-auto max-w-6xl flex flex-col justify-center">
          <div className="flex justify-between px-16">
            
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-100">Featured Products</h2>
            
            <Button
              onClick={toggleCompareMode}
              className={`${
                isCompareMode
                  ? "bg-red-500/30 hover:bg-red-600/30"
                  : "bg-gradient-to-r from-green-500/30 to-blue-500/30 hover:from-green-600/30 hover:to-blue-600/30"
              } text-white border border-white/30 sticky`}
            >
              {isCompareMode ? "Cancel Compare" : `Compare`} <GitCompareArrows />
            </Button>

          </div>
          <div className={flexOrGrid} ref={productsRef} >
            {
            loading ? 

              <Loader /> :

              (products.map((product, index) => (
                <ProductCard key={index} product = {product} index = {index} 
                isSelected = {selectedProducts.includes(product.id)}
                isCompareMode = {isCompareMode}
                setSelectedProducts = {handleSelectedProducts}
                />)))

            }
          </div>

            <div className="flex justify-center">
              <PaginationControls />
            </div>

        </div>
      </section>
    </main>
  )
}

