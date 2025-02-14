import { Product } from "../../models/product.model.js";
import { promptOpenAi } from "../../utils/azure-openai.js";
import FirecrawlApp from "@mendable/firecrawl-js";
import { z } from "zod";

export const fetchProductCardDetails = async (req, res, next) => {

  try{
    const compareProducts = req.body

    if(!compareProducts) {
        throw Error("Compare products not right")
        return
    }

    const [ product1, product2 ] = compareProducts

    const productCard1 = await Product.findOne({
        $or: [ { title: product1.title } ]
    })
      
    const productCard2 = await Product.findOne({
        $or: [ { title: product2.title } ]
    })
    
      console.log("Found Products: ", [productCard1, productCard2])

      const AIresponse = await getComparisonDetails(productCard1.link, productCard2.link)

      res.status(200).json({
        compareProduct1: productCard1,
        compareProduct2: productCard2,
        AIResponse: AIresponse
      })

    }catch(err){
        next(err)
    }


}


const getComparisonDetails = async (url1, url2) => {

    console.log("scraping 1st product")
    const product1Details = await getProductDetails(url1);

    // Extract details for the second product
    console.log("scraping 2nd product")
    const product2Details = await getProductDetails(url2);

    console.log("Now starting comparison")
    // Combine the results for comparison
    const comparisonResult = {
      product1: product1Details,
      product2: product2Details,
    };

    console.log("Comparison Result:", comparisonResult);
    return comparisonResult;
};


const getProductDetails = async (url) => {

  const app = new FirecrawlApp({
    apiKey: "fc-6d74df6872c0461ebef360fce2f44ca0"
  });

  const productUrls = {
    url1 : url,
  }

  const ProductFeatureSchema = z.object({
    feature: z.string(), // Feature name
    details: z.string()  // Feature details
  });

  const ProductSchema = z.object({
    features: z.array(ProductFeatureSchema), // Exactly 3 features
    // ai_rating: z.string(), // AI rating
    // ai_recommendation: z.string() // AI recommendation
  });

  const systemPrompt = `
    You are a helpful shopping assistant. Your task is to extract data about a 3 product features from the given URL and return the result in a structured JSON format.

  `;

    const scrapeResult = await app.extract([
      productUrls.url1
    ], {
      prompt: systemPrompt,
      schema: ProductSchema
    });

    if (!scrapeResult.success) {
      throw new Error(`Failed to scrape: ${scrapeResult.error}`);
    }

    console.log("Scrape Result:", scrapeResult.data);
    return scrapeResult.data;

};