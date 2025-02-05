import {scrapedData} from './scrapeGraphAi.js';
import { promptOpenAi } from './azure-openai.js';
import { response } from 'express';

const { scrapeAmazon, scrapeEbay } = scrapedData

const schema = {
  product: "product name in string",
  maxPrice : { currency: "currency here", value: "price value in numbers here"  },
  advice: "additional info or advice if user asks of it"
}


const msgs = [
  {
    "role": "system",
    "content": `
    The user will describe what they want to shop for. Your task is to extract the product name, 
    the brand (if mentioned),its specs (if mentioned) and the maximum price they are willing to spend. If the query doesn't mention 
    a maximum price,any product, set it to null. Output the result as a JSON object according to this schema: ${JSON.stringify(schema)}. 
    Do not write anything else, as the result you provide will be later parsed using JSON.parse().
  `
  },

];

// Additional Instructions:

// If the user asks for additional shopping-related information (e.g., product recommendations, reviews, or general shopping advice) 
// without explicitly asking to see products:

// Respond flexibly and naturally, providing helpful advice or information related to their query. Then, gently guide the
// user to describe what they want to shop for

// If the user asks about something completely unrelated to shopping:

// Politely acknowledge their query and guide them back to shopping-related topics in a natural and conversational way.

export const getUserProductPrompt = async (userQuery) => {

  // const userQuery = "show me great deals on gaming laptops under 1000$";

  msgs.push({
    "role": "user",
    "content": userQuery
  })

  const result = await promptOpenAi(msgs)
  console.log('Extracted Data:', result);

  msgs.push({
    role: "assistant",
    content: result.advice
  });

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

// const returnedResult = await getUserProductPrompt("I want to design my room")
// const { product } = returnedResult
// console.log("The destructured product: ", product)
// console.log("Now scraping..... ")

// getScrapeResults("Gaming Laptops")

// await scrapeAmazon("mac Laptops")






