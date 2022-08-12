const conn      = require('./connection');
const express   = require('express');
const { response } = require('./app');
const router    = express.Router();

router.get('/:id', (req, response) => {
    const id = req.params.id
    const textQ = "SELECT * FROM barang WHERE id="+id
    conn.query(textQ, (err, result) => {
        if(err)
            response.send(err);
        else
            response.send(result.rows)
    })
})
router.post('/', (req, response) => {
    const nama = req.body.nama
    const textQ = "INSERT INTO barang(nama) VALUES ('"+ nama +"')"
    conn.query(textQ, (err, res) => {
        if(err)
            response.send(err);
        else
            response.send(res.rows)
    })
})

module.exports = router