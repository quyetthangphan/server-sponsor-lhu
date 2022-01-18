var express = require('express');
var app = express();
app.use(express.static('src/public'));


app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use('/scripts', express.static(__dirname + '/node_modules/web3.js-browser/build/'));
app.use('/scripts', express.static(__dirname + '/node_modules/zebra_dialog/dist'));
const cors = require("cors");

app.use(cors());
const PORT = process.env.PORT || 5000;
var server = require('http').Server(app);
server.listen(PORT, function () {
    console.log("Server is running...");
});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


// Mongoose 
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://mas:S3cJ6eGg0xu4vWHx@cluster0.a4dtz.mongodb.net/sponsor?retryWrites=true&w=majority', function (err) {
    if (err) {
        console.log('err: ', err);
    } else {
        console.log('server mongo connected success');
    }
});

require('./src/controllers/user.controller')(app);