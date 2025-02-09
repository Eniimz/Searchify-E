import { Product } from "../models/product.model.js";
import { scrapeDetails } from "../utils/Details-scrape/FireewallScrape.js";

export const getProductDetails = async (req, res, next) => {

    const { productId } = req.params;

    const { link } = await getProductLink(productId)

    const productDetails = await scrapeDetails(link)

    console.log('Product details: ', productDetails)



    res.status(200).json({ product: productDetails })


}


const getProductLink = async (productId) => {

    try{
        const product = await Product.findOne({ id: productId }).lean()
        
        console.log("Product: ", product)

        return product

    }catch(err){
        console.log(err)
    }

}

