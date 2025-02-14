import express from "express";
import { addToWishlist, getProductDetails } from "../controllers/productControllers/product.controller.js   ";
import { fetchProductCardDetails } from "../controllers/productControllers/compare.controller.js";
import { checkIfProductInWishlist, getWishlistItems, removeFromWishlist } from "../controllers/productControllers/product.controller.js";

const router = express.Router()


router.post("/products/compare", fetchProductCardDetails)   
router.get("/products/:productTitle", getProductDetails)
router.post("/wishlist", addToWishlist)
router.post("/wishlist/remove", removeFromWishlist)
router.post("/wishlist/check", checkIfProductInWishlist)
router.get("/wishlist/fetch", getWishlistItems)



export default router;