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
        let name = file.originalname.replaceAll(" ", "-")
        cb(null, name)
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

router.post('/', upload.single("foto"), (req, res, next) => {
    let rows = 0
    const nama      = req.body.nama
    const foto      = req.file.path
    const hargaBeli = req.body.hargaBeli
    const hargaJual = req.body.hargaJual
    const stok      = req.body.stok
    //validasi input number
    if(
        isNaN(hargaBeli) ||
        isNaN(hargaJual) ||
        isNaN(stok)
    )
    {
        res.status(405).json({
            message: "failed input number"
        })
    }
    else
    {
        const checkdata = `SELECT * FROM barang WHERE nama='${nama}'`
        conn.query(checkdata, (err, resdata) => {
            rows = resdata.rows.length
        })
        if(rows == 0)
        {
            const textq =
            `INSERT INTO barang (nama, foto, harga_beli, harga_jual, stok) 
            VALUES ('${nama}', '${foto}', ${hargaBeli}, ${hargaJual}, ${stok})`
            conn.query(textq, (err, result) => {
                if(err)
                    res.status(405).json({
                        message: err
                    })
                else
                    res.status(200).json({
                        message: nama,
                        image: req.file.path
                    })
            })
        }
        else
        {
            res.status(404).json({
                message: "data exist"
            })
        }
    }

})

//get semua data
router.get('/', (req, res, next) => {
    const id = req.params.id
    const checkdata = `SELECT * FROM barang`
    conn.query(checkdata, (err, resdata) => {
        let dataBarang = resdata.rows
        if(dataBarang.length > 0)
        {
            res.status(200).json({
                message: "success",
                data: dataBarang
            })
        }
        else
            res.status(404).json({
                message: "failed",
                data: "no data"
            })
    })
})

//get data berdasarkan id
router.get('/:id', (req, res, next) => {
    const id = req.params.id
    const checkdata = `SELECT * FROM barang WHERE id='${id}'`
    conn.query(checkdata, (err, resdata) => {
        let dataBarang = resdata.rows
        if(dataBarang.length > 0)
        {
            res.status(200).json({
                message: "success",
                data: dataBarang
            })
        }
        else
            res.status(404).json({
                message: "failed",
                data: "no data"
            })
    })
})

router.put('/:id', upload.single("foto"), (req, res, next) => {
    
    const id        = req.params.id
    const nama      = req.body.nama
    const foto      = req.file.path
    const hargaBeli = req.body.hargaBeli
    const hargaJual = req.body.hargaJual
    const stok      = req.body.stok

    //validasi input number
    if(
        isNaN(hargaBeli) ||
        isNaN(hargaJual) ||
        isNaN(stok)
    )
    {
        
        res.status(405).json({
            message: "failed input number"
        })
    }
    else
    {
        const updatedata =
        `UPDATE barang
        SET nama='${nama}',
            foto='${foto}',
            harga_beli=${hargaBeli},
            harga_jual=${hargaJual},
            stok=${stok}
        WHERE id=${id}`
        conn.query(updatedata, (err, result) => {
            if(err)
            {
                res.status(200).json({
                    message: "failed",
                    data: err
                })
            }
            else
                res.status(404).json({
                    message: "success",
                    data: "data updated"
                })
        })
    }
})

router.delete('/:id', (req, response, next) => {
    const id = req.params.id
    const checkdata = `SELECT * FROM barang WHERE id='${id}'`
    conn.query(checkdata, (err, resdata) => {
        if(resdata.rows.length > 0)
        {
            const deletedata = `DELETE FROM barang WHERE id='${id}'`
            conn.query(deletedata, (err, resdata) => {
                if(err)
                    response.status(405).json({
                        message: "failed",
                        data: "failed deleting data"
                    })
                else
                    response.status(200).json({
                        message: "success",
                        data: "data deleted"
                    })
            })
        }
        else
        {
            response.status(404).json({
                message: "failed",
                data: "data not found"
            })
        }
    })
})

module.exports = router