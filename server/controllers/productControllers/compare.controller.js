import { date } from "zod";
import { Product } from "../../models/product.model.js";
import { promptOpenAi } from "../../utils/azure-openai.js";

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

          const AIresponse = await getComparisonDetails(productCard1.title, productCard2.title)

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


const getComparisonDetails = async (product1, product2) => {

    const schema = {
        product1: {
          features: [
            {
              feature: "feature name in string",
              details: "feature details in string"
            },
            {
              feature: "feature name in string",
              details: "feature details in string"
            },
            {
              feature: "feature name in string",
              details: "feature details in string"
            },
            {
              feature: "feature name in string",
              details: "feature details in string"
            },
            {
              feature: "feature name in string",
              details: "feature details in string"
            }
          ],
          ai_rating: "rating out of 5",
          ai_recommendation: "brief recommendation based on features and use cases"
        },
        product2: {
        
          features: [
            {
              feature: "feature name in string",
              details: "feature details in string"
            },
            {
              feature: "feature name in string",
              details: "feature details in string"
            },
            {
              feature: "feature name in string",
              details: "feature details in string"
            },
            {
              feature: "feature name in string",
              details: "feature details in string"
            },
            {
              feature: "feature name in string",
              details: "feature details in string"
            }
          ],
          ai_rating: "rating out of 5",
          ai_recommendation: "brief recommendation based on features and use cases"
        },
        summary: "A brief comparison summary of the two products."
      };
    
      const systemPrompt = `
        You are a helpful shopping assistant. Your task is to compare two products based on their name and provide a detailed comparison in a structured JSON format.
    
        Input: Two product names (e.g., "Apple iPhone 12 mini" and "Apple iPhone 12").
    
        Output: A JSON object with the following schema:
        ${JSON.stringify(schema, null, 2)}
    
        Instructions:
        1. Compare the two products based on their features.
        2. Provide exactly 5 features for each product. Each feature should have a "feature" (name) and "details" (description).
        3. Provide an AI rating for each product (out of 10) based on its features and overall value.
        4. Provide an AI recommendation for each product, explaining why it might be a good choice for certain users.
        5. Include a brief summary comparing the two products.
        6. Ensure the output strictly adheres to the provided schema.
        7. Do not include any additional text or explanations outside the JSON object.
        8. If any information is unavailable, set the value to null.
      `;
    
      const userPrompt = `
        Compare the following two products:
        1. ${product1.title}
        2. ${product2.title}
      `;
    
      const messages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ];
    
      const response = await promptOpenAi(messages)

      console.log("----AI Response----")

      console.log(response)

      return response
      
}