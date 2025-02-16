
import express from 'express'
import { getPromptAndFetch } from '../controllers/prompt.controller.js'
import { handlePrompt } from '../controllers/promptControllers/handle.controller.js'

const router = express.Router()



router.post("/prompt", getPromptAndFetch)

router.post("/handle-prompt", handlePrompt)


export default router;