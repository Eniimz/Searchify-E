import { all } from "axios"
import { getUserProductPrompt, getScrapeResults } from "../utils/promptHandle.js"
import { v4 as uuidv4 } from 'uuid'
import { scrapeAmazonBright } from "../utils/Bright-Data/scrape.js"
import { scrapeDetails } from "../utils/Details-scrape/FireewallScrape.js"
import { scrapeEbay } from "../utils/scrapeGraphAi.js"
import NodeCache from 'node-cache'

const cache = new NodeCache({ stdTTL: 600 });

let useAmazon = true;

export const getPromptAndFetch = async (req, res, next) => {

    const { prompt } = req.body
    const { page = 1 } = req.query
    const limit = 10

    const endIndex = page * limit  // 1 * 10
    const startIndex = endIndex - limit // 10 - 10 

    let allProducts = null;

    console.log("Gettting the requested product from user query...: ", prompt)

    const returnedResult = await getUserProductPrompt(prompt) //geting query from prompt
    const { product } = returnedResult


    if(!product) return

        const query = product

        const cacheKey = `${query}-${page}`


        const cachedData = cache.get(cacheKey)

        if(cachedData){
            return res.json({allProducts: cachedData, advice: null})
        }

        console.log("Now scraping as product was found..... ")       
        // allProducts = await getScrapeResults(product) //if product is extracted 

        const store = useAmazon ? 'Amazon' : 'Ebay'

        console.log(`Scraping from ${store}: for page ${page}`)


        allProducts = useAmazon 
        ? await scrapeAmazonBright(product, startIndex, endIndex)
        : await scrapeEbay(product)

        
        allProducts = allProducts.map((product) => {
            return {
                id: uuidv4(),
                ...product
            }
        })
        cache.set(cacheKey, allProducts)

    
        useAmazon = !useAmazon  //toggeling the store

    const { advice } = returnedResult; 
    
    console.log("Advice: ", advice)

    res.status(200).json({allProducts, advice})


    logCache()

    preFetchNextPage(query, page + 1, startIndex + limit, endIndex + limit)
    // allProducts?.slice(0, 9).forEach(async (product) => {
    //     await scrapeDetails(product.li // })

}



const preFetchNextPage = (query, nextPage, startIndex, endIndex) => {

    const cacheKey = `${query}-${nextPage}`

    if(cache.get(cacheKey)) return


    const store = useAmazon ? 'Amazon' : 'Ebay'

    console.log(`PreFetching from ${store} for page ${nextPage}`)

    const nextPageDataPromise = scrapeAmazonBright(query, )

    // const nextPageDataPromise = useAmazon
    // ? scrapeAmazonBright(query, startIndex, endIndex)
    // : scrapeEbay(product)

    nextPageDataPromise.then((nextPageData) => {
        cache.set(cacheKey, nextPageData)
        logCache()
    })


}

const logCache = () => {
    const keys = cache.keys()

    console.log('---Cache contents---')
    keys.forEach((key) => {
        const value = cache.get(key)
        console.log(`${key}: `, value)
    })
}