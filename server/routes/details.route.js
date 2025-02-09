import express from "express";
import { getProductDetails } from "../controllers/details.controller.js";

const router = express.Router()


router.get("/products/:productId", getProductDetails)


export default router;