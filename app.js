const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const barangRoutes = require('./api/routes/barang')

app.use(bodyParser.json())

// handling Cross Origin Request
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        // below is which kind of headers you want to accept
        'Origin, X-Requested-With, Content-type, Accept, Authorization'
    );
    // check if incoming request method is equals to 'OPTIONS'
    if(req.method === 'OPTIONS')
    {
        res.header(
            'Access-Control-Allow-Methods',
            // below is which kind of methods you want to accept
            'POST, DELETE, GET'
            );
        return res.status(200).json({});
    }
    next();
});
app.use("/uploads/", express.static("./uploads/"));
app.use('/barang',barangRoutes)

module.exports = app