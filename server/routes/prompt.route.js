
import express from 'express'
import { getPromptAndFetch } from '../controllers/prompt.controller.js'

const router = express.Router()



router.post("/prompt", getPromptAndFetch)


export default router;