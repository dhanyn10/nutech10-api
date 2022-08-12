const express = require('express')
const router = express.Router()
//file upload
const multer = require('multer')
const upload = multer({dest: 'uploads/'})

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