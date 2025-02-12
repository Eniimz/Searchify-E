import { Product } from "../../models/product.model.js";
import { promptOpenAi } from "../../utils/azure-openai.js";
import FirecrawlApp from "@mendable/firecrawl-js";
import { z } from "zod";

export const fetchProductCardDetails = async (req, res, next) => {

    const compareProducts = req.body

    if(!compareProducts) {
        throw Error("Compare products not right")
        return
    }

    const [ product1, product2 ] = compareProducts

    try{

        // const products = await Product.find({
        //     $or: compareProducts.map(product => ({
        //       $or: [
        //         { id: product.id },  // Matching by id
        //         { title: product.title } // Matching by title
        //       ]
        //     }))
        //   });

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
        console.error("The err: ", err)
        res.status(500).json({ message: 'error' })
    }


}


const getComparisonDetails = async (url1, url2) => {
  try {

    
    // url1 = 'https://www.amazon.com/16-0-inch-Windows-Quad-Core-Processor-Display/dp/B0DSKPFRKP/ref=sr_1_1_sspa?dib=eyJ2IjoiMSJ9.pOGFkEDyfRRZ4GTiQOeqTY3xdoD4deadpUg1XyRqz9TcygpzfjxbJdcZ7Eg3Trcmhbj1DTc115LDv2scS0gNc3AJDaxLqXygKJbm5aUBD9zQK9VidjENNzIv1RKgcBjI-Gls3gQ-xYCgUca3l8juUKcx9mFv73KnQzvFesVGU6WVzy__FnnUmagSl2N34RmuvYE-WdTHWngLDfBIHroeuJLk7xAwWXRQ6pN3JsDAIuE.gUWsv67AvV35bMlcqdhy21F-iyqClFQZic_-PMZUzuc&dib_tag=se&keywords=gaming+laptop&qid=1739318981&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1';
    // url2 = 'https://www.amazon.com/KAIGERR-Computer-Graphics-16-1-inch-Display/dp/B0DR8859K6/ref=sr_1_1_sspa?dib=eyJ2IjoiMSJ9.pOGFkEDyfRRZ4GTiQOeqTY3xdoD4deadpUg1XyRqz9TcygpzfjxbJdcZ7Eg3Trcmhbj1DTc115LDv2scS0gNc3AJDaxLqXygKJbm5aUBD9zQK9VidjENNzIv1RKgcBjI-Gls3gQ-xYCgUca3l8juUKcx9mFv73KnQzvFesVGU6WVzy__FnnUmagSl2N34RmuvYE-WdTHWngLDfBIHroeuJLk7xAwWXRQ6pN3JsDAIuE.gUWsv67AvV35bMlcqdhy21F-iyqClFQZic_-PMZUzuc&dib_tag=se&keywords=gaming+laptop&qid=1739318948&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1';

    // Extract details for the first product
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
  } catch (error) {
    console.error("Error during comparison:", error);
    throw error;
  }
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
    // name: z.string(), // Product name
    features: z.array(ProductFeatureSchema), // Exactly 3 features
    // ai_rating: z.string(), // AI rating
    // ai_recommendation: z.string() // AI recommendation
  });

  const systemPrompt = `
    You are a helpful shopping assistant. Your task is to extract data about a 3 product features from the given URL and return the result in a structured JSON format.

  `;

  try {
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
  } catch (error) {
    console.error("Error during extraction:", error);
    throw error;
  }
};