import { Router } from 'express'
import upload from '../libs/multer'

const router = Router()

router.post('/', upload.single('image'), (req, res) => {
    //console.log(req.file);
    res.status(200).send(req.file)

})

export default router