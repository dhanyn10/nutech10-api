const express = require('express')
const app = express()
const barangRoute = require('./Barang')
const bodyParser = require('body-parser')

app.use(express.json());
app.use(bodyParser.json({ limit: "100kb" }))

app.use('/barang', barangRoute)
module.exports = app;