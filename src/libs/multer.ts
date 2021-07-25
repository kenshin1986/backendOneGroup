import { Response } from 'express'
import multer, { StorageEngine, FileFilterCallback, } from 'multer'

const storage: StorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'dist/public/images')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})


const uploadImage = multer({ storage })



export default uploadImage