const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    accountType:{
        type:String,
        required:true
    },
    livingArea:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('users',Schema)