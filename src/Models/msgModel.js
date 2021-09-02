
const mongoose = require('mongoose');

const msgSchema = mongoose.Schema({
    msgs : String,
    chatId : String,
    auther : String,
},{timestamps : true})
module.exports = mongoose.model('message',msgSchema)