const mongoose = require("mongoose");

const tranShema = new mongoose.Schema({
    user:String,
    tx:String,
});

module.exports = mongoose.model('tran',tranShema);