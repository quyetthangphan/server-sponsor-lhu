const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:String,
    pass:String,
    phone:String,
    email:String,
    address:String,
    wallet:String,
    type:String,
    pdf:String
});

module.exports = mongoose.model('user',userSchema);