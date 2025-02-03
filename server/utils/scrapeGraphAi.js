import { smartScraper } from 'scrapegraph-js';
import { z } from "zod"
 
const apiKey = "sgai-58e2dd51-1408-49a9-851a-50cde2837cdf";

export const schema = z.object({
  title: z.string().describe('The title of the product'),
  price: z.number().describe("the price of the product"),
  rating: z.number().describe("The review rating of the product"),
  imageUrl: z.string().url(),
  link: z.string().url()

})

const prompt = `Extract top 2 products data and return the result in json format with fields
title, price,rating,description imageUrl, link. If any data is not found, just write "N/A" for that
field

`


export const scrapeAmazon = async (queryParams) => {

  const url = `https://amazon.com/s?k=${queryParams}`;
  

  try {
    const response = await smartScraper(apiKey, url, prompt, schema);
    console.log("----- amazon products----")
    console.log(response.result.products)
    console.log("scrapped amazon succesfully");

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
    console.log(response.result.products)
    console.log("scraped ebay successfully");

    return response.result.products ? response.result.products :  [response.result] // if more than one product, if not...return array

  } catch (error) {
    console.error('Error:', error);
  }
   
}



export const scrapedData = { scrapeAmazon, scrapeEbay } ;
