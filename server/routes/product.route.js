import express from "express";
import { addToWishlist, getProductDetails } from "../controllers/productControllers/product.controller.js";
import { fetchProductCardDetails } from "../controllers/productControllers/compare.controller.js";

const router = express.Router()


router.post("/products/compare", fetchProductCardDetails)   
router.get("/products/:productTitle", getProductDetails)
router.post("/wishlist", addToWishlist)


export default router;