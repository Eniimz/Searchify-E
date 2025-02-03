import FirecrawlApp from "@mendable/firecrawl-js";
import { z } from "zod";

const app = new FirecrawlApp({
  apiKey: "fc-6d74df6872c0461ebef360fce2f44ca0"
});

// Define schema to extract contents into
const ProductFeatureSchema = z.object({
    feature: z.string(), // Feature name
    details: z.string(), // Feature details
  });
  
  // Define the schema for the product
  const ProductSchema = z.object({
    ProductTitle: z.string(), // Product title
    price: z.object({
      listPrice: z.string(), // Listed price
      currentPrice: z.string(), // Current price
      savings: z.string(), // Savings
    }),
    sellerInfo: z.object({
      sellerName: z.string(), // Seller name
      sellerRating: z.number(), // Seller rating (float)
      numReviews: z.number(), // Number of reviews
    }),
    customerReviews: z.object({
      overallRating: z.number(), // Overall rating (float)
      numReviews: z.number(), // Number of reviews
    }),
    productFeatures: z.array(ProductFeatureSchema), // Array of product features
    shipping: z.string(), // Shipping details
  });


  const productUrls = {
    amazonUrl: `https://amazon.com/Logitech-G502-Performance-Gaming-Mouse/dp/B07GBZ4Q68/ref=sr_1_1?dib=eyJ2IjoiMSJ9.D51lWxt7OD5GPXMrCM-hnnHpwbQ5ea1aTLHft-lQuIl-kmXwBzdrjy57OsEMOjI4N-80uT-ie9iGtmHqJocIrt_NLD4y3E3qnGpJ1m_F3ahSIPt_ILMkP24K7pCaGMgGTWgT0fEfd9zQ1Vt3sPRmCfp6hR9qQFmB2_QoSqE7Qe-X-gUUQ8HO6PWawHDyb0OCR-kfQjcRe7ye5yCzQfZBcT9lX1HD-g54UkO1gR_-m-o.JfgqaGJvpMOY7SvYmooHuZEsvC5UExCXHg_eJ7P8mj8&dib_tag=se&keywords=gaming+mouse&qid=1738457675&sr=8-1'`,
    ebayUrl: `https://www.ebay.com/itm/387863605258`,
    amzUrl2: `https://amazon.com/Redragon-M612-Predator-Programmable-Software/dp/B08SJ5Z8JL/ref=sr_1_3`
}

const scrapeResult = await app.extract([
  productUrls.amzUrl2,  
], {
  prompt: `You are a web scraping assistant that extracts product details from a given URL and returns the information in the structured JSON format
  If there's some info that you dont find. return "N/A" for that field`,
  schema: ProductSchema
});

if (!scrapeResult.success) {
  throw new Error(`Failed to scrape: ${scrapeResult.error}`)
}

console.log(scrapeResult.data);
