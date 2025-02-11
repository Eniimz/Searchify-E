import { all } from "axios"
import { getUserProductPrompt, getScrapeResults } from "../utils/promptHandle.js"
import { v4 as uuidv4 } from 'uuid'
import { scrapeAmazonBright } from "../utils/Bright-Data/scrape.js"
import { scrapeDetails } from "../utils/Details-scrape/FireewallScrape.js"
import { scrapeAmazon, scrapeEbay } from "../utils/scrapeGraphAi.js"
import NodeCache from 'node-cache'
import { Product } from "../models/product.model.js"

const cache = new NodeCache({ stdTTL: 600 });

let useAmazon = true;

const pageLimit = 3

export const getPromptAndFetch = async (req, res, next) => {

    const { prompt } = req.body
    const { page = 1 } = req.query
    const limit = 10

    if(page > pageLimit) return  // > 3 but prefetch can occur so another check is needed

    const endIndex = page * limit  // 1 * 10
    const startIndex = endIndex - limit // 10 - 10 
    const store = useAmazon ? 'Amazon' : 'Ebay'

    let allProducts = null;

    console.log("Gettting the requested product from user query...: ", prompt)

    const returnedResult = await getUserProductPrompt(prompt) //geting query from prompt
    const { product } = returnedResult


    if(!product) return

        const query = product

        const cacheKey = `${query}-${store}-${page}`


        console.log("THE PAGE:", page)
        console.log("The store: ", store)

        const cachedData = cache.get(cacheKey)

        console.log("chachedData: ", cachedData)

        if(cachedData){ 

             res.json({allProducts: cachedData, advice: null})
             useAmazon = !useAmazon
             const newPageToFetch = Number(page) + 1;
            
             if(newPageToFetch > pageLimit) return //  if this new page > 3 

             preFetchNextPage(query, Number(page) + 1, startIndex + limit, endIndex + limit)
             return
        }

        console.log("Now scraping as product was found..... ")       
        // allProducts = await getScrapeResults(product) //if product is extracted 

        

        console.log(`Scraping from ${store}: for page ${page}`)


        allProducts = useAmazon 
        ? await scrapeAmazon(product, page)
        : await scrapeEbay(product, page)

        
        allProducts = allProducts.slice(0, 9).map((product) => {
            return {
                // id: store === 'Amazon' ?  extractAmazonId(product.link) : extractEbayId(product.link),
                id: uuidv4(),
                query,
                ...product
            }
        })
        cache.set(cacheKey, allProducts)

        console.log("The cached?????: ", cache.get(cacheKey))
    
        useAmazon = !useAmazon  //toggeling the store

    const { advice } = returnedResult; 
    
    console.log("Advice: ", advice)

    res.status(200).json({allProducts, advice})

    console.log("----SAVING TO DB----")
    await saveToDatabase(allProducts)


    logCache()

    preFetchNextPage(query, Number(page) + 1, startIndex + limit, endIndex + limit)

    // allProducts?.slice(0, 9).forEach(async (product) => {
    //     await scrapeDetails(product.li // })

}

function extractEbayId(url) {
    const regex = /\/itm\/(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  function extractAmazonId(url) {
    const regex = /\/dp\/([A-Z0-9]{10})/;  // Regex for extracting ASIN
    const match = url.match(regex);
    return match ? match[1] : null;  // Return ASIN if found
  }
  
const preFetchNextPage = (query, nextPage, startIndex, endIndex) => {

    if(nextPage > pageLimit) return

    const store = useAmazon ? 'Amazon' : 'Ebay'
    const cacheKey = `${query}-${store}-${nextPage}`


    console.log("The page: ", nextPage)

    if(cache.get(cacheKey) && nextPage <= pageLimit){
        const cachedData = cache.get(cacheKey)
        useAmazon - !useAmazon
        const newPageToFetch = nextPage + 1

        if(newPageToFetch > pageLimit) return
        
        preFetchNextPage(query, Number(nextPage) + 1, startIndex, endIndex )
        return
    }



    console.log(`PreFetching from ${store} for page ${nextPage}`)

    // const nextPageDataPromise = scrapeAmazon(query)

    const nextPageDataPromise = useAmazon
    ? scrapeAmazon(query,  nextPage)
    : scrapeEbay(query, nextPage)

    nextPageDataPromise.then(async (nextPageData) => {
        console.log("caching prefetch...")

        nextPageData = nextPageData.slice(0, 9).map((product) => { //the prefetched products
            return {
                // id: store === 'Amazon' ? extractAmazonId(product.link) : extractEbayId(product.link),
                id: uuidv4(),
                query,
                ...product
            }
        })
        cache.set(cacheKey, nextPageData)
        console.log("prefetch cached??????: ", cache.get(cacheKey))

        console.log("---Saving prefetched data to db----")



        await saveToDatabase(nextPageData)
        logCache()
    })


}


const saveToDatabase = async (productData) => {

    try{
        const result = await Product.insertMany(productData)
        console.log(`${result.length} documents inserted`);
        // console.log('Inserted IDs:', result.);
    }catch(error){
        console.error('Error inserting documents: ', error)
    }

} 

const logCache = () => {
    const keys = cache.keys()

    console.log('---Cache keys Start---')
    keys.forEach((key) => {
        const value = cache.get(key)
        console.log(`${key}:`)
    })
    console.log('---Cache keys END---')
}