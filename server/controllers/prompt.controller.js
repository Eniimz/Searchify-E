import { all } from "axios"
import { getUserProductPrompt, getScrapeResults } from "../utils/scrape.js"
import { v4 as uuidv4 } from 'uuid'


export const getPrompt = async (req, res, next) => {

    const { prompt } = req.body
    let allProducts = null;

    console.log("Gettting the requested product from user query...: ", prompt)

    const returnedResult = await getUserProductPrompt(prompt)

    const { product } = returnedResult
    console.log("The destructured product: ", product)
    
    if(product){
        console.log("Now scraping as product was found..... ")
        
        allProducts = await getScrapeResults(product) //if product is extracted 
        
        allProducts = allProducts.map((product) => {
            return {
                id: uuidv4(),
                ...product
            }
        })
    }else{
        console.log("No product mentioned")
    }

    const { advice } = returnedResult; 
    
    console.log("Advice: ", advice)

    return res.status(200).json({allProducts, advice})


}