const conn      = require('../../connection')
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

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    {
        cb(null, true)
    }
    else
    {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 100 //100kb
    },
    fileFilter: fileFilter
})

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "get barang"
    })
})

router.post('/', upload.single("foto"), (req, res, next) => {
    console.log(req.file)
    const nama = req.body.nama
    const foto = req.file.path
    const textq = `INSERT INTO barang(nama, foto) VALUES ('${nama}', '${foto}')`
    conn.query(textq, (err, result) => {
        if(err)
            res.status(404).json({
                message: err
            })
        else
            res.status(200).json({
                message: nama,
                image: req.file.path
            })
    })
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id
})

module.exports = router