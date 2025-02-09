import { Button } from "@/components/ui/button"
import { Product } from "@/lib/types"
import { DetailCard } from "../comparisonPage/Detail-Card"
import { div, use } from "framer-motion/client";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

//@ts-nocheck

interface ProductSidebarProps {
  product: Product | null
}

const productData = {
    ProductTitle: "Wireless Noise-Cancelling Headphones",
    price: {
      listPrice: "$299.99",
      currentPrice: "$199.99",
      savings: "$100.00 (33%)",
    },
    sellerInfo: {
      sellerName: "TechGadgets Inc.",
      sellerRating: 4.7,
      numReviews: 1200,
    },
    customerReviews: {
      overallRating: 4.5,
      numReviews: 3500,
    },
    productFeatures: [
      {
        feature: "Noise Cancellation",
        details: "Advanced noise-cancelling technology for immersive sound.",
      },
      {
        feature: "Battery Life",
        details: "Up to 30 hours of playtime on a single charge.",
      },
      {
        feature: "Bluetooth Connectivity",
        details: "Seamless wireless connection with Bluetooth 5.0.",
      },
      {
        feature: "Comfort",
        details: "Soft ear cushions and adjustable headband for all-day comfort.",
      },
    ],
    shipping: "Free shipping on orders over $50",
    imageUrl: "https://m.media-amazon.com/images/I/71N76hGMHVL._AC_UL320_.jpg",
  };


  
  export default function ProductSidebar() {
    
    const [product, setProduct] = useState<any>(null)
    const { productId } = useParams()
    
    const fetchProductDetails = async () => {
  
      try{
        const res = await fetch(`http://localhost:3000/api/products/${productId}`)
  
        const data = await res.json();
  
        console.log("The res received: ", data)

        setProduct(data.product)


        
      }catch(err){
        console.log('Erros occured while fetching product Details: ', err)
      }
  
    }

    useEffect(() => {

     fetchProductDetails()

    }, [])


  return (
    <div>
        {product ? 

          <div>
            <DetailCard product={product}/>
          </div> :

        <div className="h-full flex items-center justify-center p-4">
          <p className="text-gray-500">Select a product to view details</p>
        </div>
      }
    </div>
  )
  }
