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

app.use(function (err, req, res, next) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.send({ result: 'fail', error: { code: 1001, message: 'File is too big' } })
      return 
    }
  
    // Handle any other errors
})

module.exports = app