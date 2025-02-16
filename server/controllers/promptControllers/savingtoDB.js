import { Product } from "../../models/product.model.js";


export const saveProductToDatabase = async (productData) => {

    try{
        const result = await Product.insertMany(productData)
        console.log(`${result.length} documents inserted`);
    }catch(error){
        console.error('Error inserting documents: ', error)
    }

} 