import { Router } from 'express'
import { uploadImage } from '../controllers/upload.controller'
import upload from '../libs/multer'


const router = Router()

router.post('/', upload.single('image'), uploadImage)

export default router