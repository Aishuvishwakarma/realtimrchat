require('../config/db')
const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')
const UserSchema = new mongoose.Schema({
    username : String,
    password : String,
    email : String,
    message :[]
},{timestamps : true})
UserSchema.plugin(plm)
module.exports = mongoose.model('user',UserSchema);