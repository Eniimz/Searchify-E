import express from "express";
import { addToWishlist, getProductDetails } from "../controllers/product.controller.js";

const router = express.Router()


router.get("/products/:productTitle", getProductDetails)
router.post("/wishlist", addToWishlist)


export default router;