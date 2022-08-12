const express   = require('express')
const router    = express.Router()
//file upload
const multer    = require('multer')

const storage   = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload    = multer({storage: storage})

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "get barang"
    })
})

router.post('/', upload.single("foto"), (req, res, next) => {
    console.log(req.file)
    res.status(200).json({
        message: "post barang"
    })
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id
})

module.exports = router