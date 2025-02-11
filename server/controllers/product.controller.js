import { Product } from "../models/product.model.js";
import { ProductDetails } from "../models/productDetails.model.js";
import { scrapeDetails } from "../utils/Details-scrape/FireewallScrape.js";
import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from 'uuid'




// const client = new MongoClient(process.env.MONGO_URI)
// const database = client.db('searchifyDB')

export const getProductDetails = async (req, res, next) => {

    const { productTitle } = req.params;
    const { id } = req.query

    const { link, imageUrl } = await getProductLink(productTitle, id)

    let productDetails = await scrapeDetails(link)

    console.log('Product details: ', productDetails)

    productDetails = {
        id,
        imageUrl,
        ...productDetails
    }

    res.status(200).json({ product: productDetails })

    addProductDetailsDB(productDetails)


}

export const addToWishlist = async (req, res, next) => {

    // try{

    // }

}

const addProductDetailsDB  = async (productDetails) => {
    

    try{
        const doc = await ProductDetails.insertOne(productDetails)

        console.log("The Product Detials inserted")
    }catch(err){
        console.log("Error occured while saving to db: ", err)
    }

}

const getProductLink = async (productTitle, productId) => {

    try{
        const product = await Product.findOne({
            $or: [
              { id: productId }, // Try to match by ID
              { title: productTitle }, // Try to match by title
            ],
          }).lean();

          console.log("The productID looking for: ", productId)
          console.log("The product tiel looking for: ", productTitle)
          console.log("The found product: ", product)

          return product

    }catch(err){
        console.log(err)
    }

}


