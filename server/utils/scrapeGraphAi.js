import { smartScraper } from 'scrapegraph-js';
import { z } from "zod"
 
const apiKey = "sgai-97735aa1-9971-46ec-8de0-455d1b8a9ab3";

export const schema = z.object({
  title: z.string().describe('The title of the product'),
  price: z.number().describe("the price of the product"),
  rating: z.number().describe("it should be like this for exmaple: 4.5"),
  description: z.string(),
  imageUrl: z.string().url(),
  link: z.string().url()

})

const prompt = `Only Extract 10 products data and return the result in json format with fields, 
title, price, rating, description, imageUrl, link.If any data is not found, just write "N/A" for that field.`


export const scrapeAmazon = async (queryParams) => {

  const url = `https://amazon.com/s?k=${queryParams}`;
  

  try {
    const response = await smartScraper(apiKey, url, prompt, schema);
    console.log("----- amazon products----")
    console.log(response.result.products)
    console.log("scrapped amazon succesfully");

    if(response === undefined ||response ===  null){
      return [ ]
    }

    return response.result.products ? response.result.products :  [response.result]
  } catch (error) {
    console.error('Error:', error);
  }
};

export const scrapeEbay = async (queryParams) => {

  console.log("The passed params: ", queryParams)

  const url = `https://www.ebay.com/sch/i.html?_nkw=${queryParams}`

  try {
    const response = await smartScraper(apiKey, url, prompt, schema);

    console.log("----- Ebay products----")
    console.log(response)
    console.log("scraped ebay successfully");

    if(response === undefined ||response === null){
      return [ ]
    }

    return response.result.products ? response.result.products :  [response.result] // if more than one product, if not...return array

  } catch (error) {
    console.error('Error:', error);
  }
   
}



export const scrapedData = { scrapeAmazon, scrapeEbay } ;
