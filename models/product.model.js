const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    organizationId:{
        type:String,
        required:true
    },
    imgLink:{
        type:String,
        required:true
    },
    nextComingDate:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('products',Schema)