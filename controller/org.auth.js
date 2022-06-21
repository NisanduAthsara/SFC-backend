const jwt = require('jsonwebtoken')
const Org = require('../models/orginization.model')

exports.getOrgId = (req,res)=>{
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

exports.getOrgById = (req,res)=>{
    if(req.body){
        const {id} = req.body
        if(!id){
            return res.json({
                success:false,
                message:"Something went wrong...!"
            })
        }
        Org.findById(id)
            .then((organization)=>{
                res.json({
                    success:true,
                    organization
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

exports.checkOrgToken = async (req,res,next)=>{
    const token = req.body.token
    if(!token){
        return res.json({
            success:false,
            message:"Unauthorized User...!"
        })
    }
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


    try {
        const organization = await Org.findById(decodeToken.id)
        if(!organization){
            return res.json({
                success:false,
                message:"Unauthorized User...!"
            })
        }

        next()

    } catch (error) {
        return res.json({
            success:false,
            message:"Something went wrong...!"
        })
    }

}