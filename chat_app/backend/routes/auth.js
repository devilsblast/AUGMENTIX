import express from 'express';
import {Register, Login, upload, verify } from '../controller/auth.controller.js';
import verifyUser from '../middleware/verifyUser.js';
import users from '../controller/user.controller.js';


const router = express.Router();


router.post('/register',upload.single('image') ,Register)
router.post('/login' ,Login)
router.get('/verify', verifyUser, verify)

export default router;