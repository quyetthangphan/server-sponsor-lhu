var UserModel = require('../models/user.model');
var TranModel = require('../models/tran.model');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || 'wss://rinkeby.infura.io/ws/v3/30fa2cfb4b034ecb9cc15e024ab098b6');
module.exports = function (app) {

    app.get('/signup', (req, res) => {
        res.render('login');
    });

    app.get('/transfer', (req, res) => {
        res.render('transfer');
    });


    app.get('/tx', function (req, res) {
        TranModel.find({}).then(function (value) {
            var arr = [];
            var data = [];
            if (value.length >= 5) {
                arr = value.slice(value.length - 5, value.length);
            } else {
                arr = value;
            }
            console.log(arr);
            get(arr).then(function (value) {
                res.json({ err: 0, data: value });
            });

        });
    });

    app.post('/tx', function (req, res) {
        tx = new TranModel({
            user: req.body.wallet,
            tx: req.body.tx,
        });
        tx.save(function (value) {
            console.log('server', value);
            if (value) {
                res.json({ err: 3, data: {} });
            } else {
                res.json({ err: 0, data: {} });
            }
        });
    })

    app.post('/signup', function (req, res) {
        var body = req.body;
        UserModel.findOne({ phone: body.phone }).then(function (user) {
            if (user) {
                res.json({ err: 2, data: {} });
                return;
            }
            object = new UserModel({
                name: body.name,
                pass: body.pass,
                phone: body.phone,
                email: body.email,
                address: body.address,
                wallet: body.wallet,
                type: body.type,
            });

            object.save(function (value) {
                console.log('server', value);
                if (value) {
                    res.json({ err: 3, data: {} });
                } else {
                    res.json({ err: 0, data: {} });
                }
            });
        });

    });



}

async function get(arr) {
    var data = [];
    for (var i = arr.length - 1; i >= 0; i--) {
        var result = await web3.eth.getTransaction(arr[i].tx);
        var tx = result["hash"];
        var from = result["from"];
        var to = result["to"];
        var value = parseInt(result["value"]) / 1000000000000000000;
        data.push({ tx: tx, from: from, to: to, value: value });
    }
    return data;
}