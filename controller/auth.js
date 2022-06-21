const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

exports.getUserId = (req,res)=>{
    if(req.body){
        const {token} = req.body
        if(!token){
            return res.json({
                success:false,
                message:"Something went wrong...!"
            })
        }

        let decodeToken;
        try{
            decodeToken = jwt.verify(token,process.env.TOKEN)
        }catch(err){
            return res.json({
                success:false,
                message:"Invalid Token...!"
            })
        }
        if(!decodeToken.id){
            return res.json({
                success:false,
                message:"Invalid Token...!"
            })
        }else{
            return res.json({
                success:true,
                id:decodeToken.id
            })
        }

    }else{
        return res.json({
            success:false,
            message:"Something went wrong...!"
        })
    }
}


exports.getUserById = (req,res)=>{
    if(req.body){
        const {id} = req.body
        if(!id){
            return res.json({
                success:false,
                message:"Something went wrong...!"
            })
        }
        User.findById(id)
            .then((user)=>{
                res.json({
                    success:true,
                    user
                })
            })
            .catch((err)=>{
                console.log(err.message)
                res.json({
                    success:false,
                    message:"Something went wrong...!"
                })
            })
    }else{
        return res.json({
            success:false,
            message:"Something went wrong...!"
        })
    }
}

exports.authMiddleware = (req,res,next)=>{
    if(req.body.token){
        const {token} = req.body

        let decodeToken
        try{
            decodeToken = jwt.verify(token,process.env.TOKEN)
        }catch(err){
            return res.json({
                success:false,
                message:"Unauthorized User...!"
            })
        }

        if(!decodeToken.id){
            return res.json({
                success:false,
                message:"Unauthorized User...!"
            })
        }
        next()
    }else{
        return res.json({
            success:false,
            message:"Unauthorized User...!"
        })
    }
}