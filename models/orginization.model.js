const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    contactNo:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    sellItem:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true,
        unique:true
    },
    openingHours:{
        type:String,
        required:true
    },
    imgLink:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('organization',Schema)