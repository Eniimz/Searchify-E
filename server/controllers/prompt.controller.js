import { all } from "axios"
import { getUserProductPrompt, getScrapeResults } from "../utils/scrape.js"
import { v4 as uuidv4 } from 'uuid'


export const getPrompt = async (req, res, next) => {

    const { prompt } = req.body

    console.log("Gettting the requested product from user query...")

    const returnedResult = await getUserProductPrompt(prompt)

    const { product } = returnedResult
    console.log("The destructured product: ", product)
    console.log("Now scraping..... ")


    let allProducts = await getScrapeResults(product)

    allProducts = allProducts.map((product) => {
        return {
            id: uuidv4(),
            ...product
        }
    })

    return res.status(200).json(allProducts)


}