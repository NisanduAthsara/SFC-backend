const Org = require('../models/orginization.model')
const {verifyOrgData} = require('../utils/org.funs')
const jwt = require('jsonwebtoken')

exports.createOrg = async (req,res)=>{
    if(!req.body){
        return res.json({
            success:false,
            message:"Something went wrong...!"
        })
    }

    const {userId} = req.body
    const user = await Org.findOne({userId})

    if(user){
        return res.json({
            success:false,
            message:"Organization already created...!"
        })
    }

    const {name,contactNo,city,sellItem,address,openingHours,imgLink,accountType} = req.body
    verifyOrgData(name,contactNo,city,sellItem,address,userId,openingHours,imgLink,accountType)
        .then(()=>{
            const newOrg = new Org({
                name,
                contactNo,
                city,
                sellItem,
                address,
                userId,
                openingHours,
                imgLink
            })

            newOrg.save(newOrg)
                .then((org)=>{
                    const token = jwt.sign({id:org._id},process.env.TOKEN,{expiresIn: "48h"})
                    return res.send({
                        success:true,
                        message:'Organization Successfully Registered!',
                        token
                    })
                })
                .catch((err) => {
                    console.log(err);
                    res.send({
                        success: false,
                        message: "Unable to add user",
                    });
                })
        })
        .catch((err) => {
            if(err.message == `Cast to ObjectId failed for value "${userId}" (type string) at path "_id" for model "users"`){
                return res.send({
                    success: false,
                    message: 'Invalid ID'
                })
            }
            res.send({
                success: false,
                message: err,
            });
        });
}


exports.findOrg = async(req,res)=>{
    if(!req.body.userId){
        return res.json({
            success:false,
            message:"Something went wrong...!"
        })
    }
    const {userId} = req.body
    const organization = await Org.findOne({userId})

    if(!organization){
        return res.json({
            success:false,
            message:"Haven't an organization...!"
        })
    }

    const token = jwt.sign({id:organization._id},process.env.TOKEN,{expiresIn: "48h"})
    return res.json({
        success:true,
        token
    })
}