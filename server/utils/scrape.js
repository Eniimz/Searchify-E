import {scrapedData} from './scrapeGraphAi.js';
import { promptOpenAi } from './azure-openai.js';

const { scrapeAmazon, scrapeEbay } = scrapedData

const schema = {
  product: "product name in string",
  maxPrice : { currency: "currency here", value: "price value in numbers here"  }
}

const msgs = [
  {
    "role": "system",
    "content": `The user will describe what they want to shop for. Extract the product name with the brand if mentioned and maximum price they are willing to spend. 
    If the query doesn't mention a maximum price, set it to null. 
    Output the result as a JSON object according to this schema: ${JSON.stringify(schema)} and dont right anything else as the result that you 
    provide will be later parsed using JSON.parse( )
    `
  },

];


export const getUserProductPrompt = async (userQuery) => {

  // const userQuery = "show me great deals on gaming laptops under 1000$";

  msgs.push({
    "role": "user",
    "content": userQuery
  })

  const result = await promptOpenAi(msgs)
  console.log('Extracted Data:', result);
  console.log("can result be in object?: ", result.product)

  return result;    

};

export const getScrapeResults = async (productQuery) => {
  try {

    console.log("The product Query: ", productQuery)

    console.log("scraping amazon...")
    const amazonProducts = await scrapeAmazon(productQuery)

    console.log("scraping Ebay...")

    const ebayProducts = await scrapeEbay(productQuery)

    const newArray = [...amazonProducts, ...ebayProducts]

    console.log("------The New Array All Products -----")

    console.log(newArray)

    return newArray

  } catch (error) {
    console.error('Error fetching scrape results:', error);
    throw error; 
  }
};




// console.log("Gettting the requested product from user query...")

// const returnedResult = await getUserProductPrompt()
// const { product } = returnedResult
// console.log("The destructured product: ", product)
// console.log("Now scraping..... ")

// getScrapeResults(product)






