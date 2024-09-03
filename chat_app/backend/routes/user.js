import express from 'express'
import users from '../controller/user.controller.js'
import verifyUser from '../middleware/verifyUser.js'

const router = express.Router()

router.get('/',verifyUser, users)

export default router;