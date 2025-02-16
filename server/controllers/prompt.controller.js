import { all } from "axios"
import { getUserProductPrompt, getScrapeResults } from "../utils/promptHandle.js"
import { v4 as uuidv4 } from 'uuid'
import { scrapeAmazonBright } from "../utils/Bright-Data/scrape.js"
import { scrapeDetails } from "../utils/Details-scrape/FireewallScrape.js"
import { scrapeAmazon, scrapeEbay } from "../utils/scrapeGraphAi.js"
import NodeCache from 'node-cache'
import { Product } from "../models/product.model.js"
import { getSocketIO } from "../socket-io.js"
import { fetchImages, updateProductImageUrls } from "../utils/unsplash/unsplash.js"

const cache = new NodeCache({ stdTTL: 600 });

let useAmazon = true;

const pageLimit = 3

export const getPromptAndFetch = async (req, res, next) => {

    const { prompt } = req.body 
    let { page = 1 } = req.query
    const limit = 10

    page = Number(page)

    if(page > pageLimit) return  // > 3 but prefetch can occur so another check is needed


    
    
    const endIndex = page * limit  // 1 * 10
    const startIndex = endIndex - limit // 10 - 10 
    let store = useAmazon ? 'Amazon' : 'Ebay'
    
    console.log("THE PAGE before:", page)
    console.log("THe type of page: " ,typeof page)
    console.log("The store before: ", store)

    if(page === 1 && store === 'Ebay'){
        console.log("Changing the store")
        
        useAmazon = true // for reseting the cache cycle
        store = 'Amazon'
    }

    if(page === 3 && store === 'Ebay') {//especially for when at page 3 user refreshes the page
        useAmazon = true
        store = 'Amazon'
    }

    let allProducts = null;

    console.log("Gettting the requested product from user query...: ", prompt)

    try{

        const returnedResult = await getUserProductPrompt(prompt) //geting query from prompt
        const { product } = returnedResult
        let maxPrice = null
        if(returnedResult.maxPrice){
            maxPrice = returnedResult.maxPrice
        }
    
        if(!product) return
    
        const query = product

        const matchedProducts = await fetchIfExistsDB(query)
        
        if(matchedProducts){
            res.status(200).json({allProducts})
            return
        }

        const cacheKey = `${query}-${store}-${page}`

        console.log("The cache key")
        console.log("THE PAGE:", page)
        console.log("The store: ", store)

        const cachedData = cache.get(cacheKey)

        console.log("chachedData: ", cachedData)

        if(cachedData){ 

                res.json({allProducts: cachedData, advice: null})
                
                if(page === 3 && store === 'Amazon') return    //especially for when at page 3 user refreshes the page

                useAmazon = !useAmazon
                const newPageToFetch = Number(page) + 1;
            
                if(newPageToFetch > pageLimit) return //  if this new page > 3 

                preFetchNextPage(query, Number(page) + 1, startIndex + limit, endIndex + limit)
                return
        }

        console.log("Now scraping as product was found..... ")                    

        console.log(`Scraping from ${store}: for page ${page}`) 

        

        allProducts = useAmazon 
        ? await scrapeAmazon(product, page)
        : await scrapeEbay(product, page)

        const images = await fetchImages(product)

        allProducts = await updateProductImageUrls(allProducts, images)
        
        console.log("allProducts: ", allProducts)

        allProducts = allProducts.slice(0, 9).map((product) => {
            return {
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
    }catch(err){
        next(err)
    }

}


  
const preFetchNextPage = async (query, nextPage, startIndex, endIndex) => {

    if(nextPage > pageLimit) return

    const store = useAmazon ? 'Amazon' : 'Ebay'
    const cacheKey = `${query}-${store}-${nextPage}`


    console.log("The page: ", nextPage)

    if(cache.get(cacheKey) && nextPage <= pageLimit){
        const cachedData = cache.get(cacheKey)

        if(nextPage === 3) return    //this is important when user comes at page 3, goes to page 2, to ensure previous page (2) to be fetched is
                                    //to be from ebay, from cache
                                                    //cache key to maintain
                                                    //amazon-page-1 => ebay-page-2 => amazon-page-3 and repeat
        useAmazon = !useAmazon
        const newPageToFetch = nextPage + 1

        if(newPageToFetch > pageLimit) return
        
        preFetchNextPage(query, Number(nextPage) + 1, startIndex, endIndex )
        return
    }


    console.log(`PreFetching from ${store} for page ${nextPage}`)

    const nextPageDataPromise = useAmazon
    ? scrapeAmazon(query,  nextPage)
    : scrapeEbay(query, nextPage)

    nextPageDataPromise.then(async (nextPageData) => {
        console.log("caching prefetch...")

        const images = await fetchImages(query)

        nextPageData = await updateProductImageUrls(nextPageData, images)

        nextPageData = nextPageData.slice(0, 9).map((product) => { //the prefetched products
            return {
                id: uuidv4(),
                query,
                ...product
            }
        })
        cache.set(cacheKey, nextPageData)
        // console.log("prefetch cached??????: ", cache.get(cacheKey))

        console.log("---Saving prefetched data to db----")

        onPrefetchComplete(nextPage)

        await saveToDatabase(nextPageData)
        logCache()
    })


}

const onPrefetchComplete = (nextPage) => {

    const io = getSocketIO()

    io.emit("prefetchingCompleted", { message: `The next page ${nextPage} has been prefetched`})


}

const saveToDatabase = async (productData) => {

    try{
        const result = await Product.insertMany(productData)
        console.log(`${result.length} documents inserted`);
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

const fetchIfExistsDB = async (query) => {

    const queryMatch = await Product.find({ title: query })

    if(queryMatch.length > 7){
        return queryMatch
    }


}