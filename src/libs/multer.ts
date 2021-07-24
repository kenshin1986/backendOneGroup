import multer, { StorageEngine } from 'multer'


const storage: StorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./public/images`)
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({ storage })



export default upload