const User = require('../models/user.model')
const Org = require('../models/orginization.model')
const Product = require('../models/product.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {verifySignUpData} = require('../utils/user.funcs')

exports.signup = (req,res)=>{
    if(req.body){
        const {username,email,password,livingArea,accountType} = req.body
        verifySignUpData(username,email,password,livingArea,accountType)
            .then(()=>{
                User.findOne({email})
                    .then((count)=>{
                        if(count){
                            return res.send({
                                success: false,
                                message: "Email is already in use!",
                            });
                        }

                        bcrypt.hash(password,10).then((newPassword)=>{
                            const newUser = new User({
                                username,
                                email,
                                password:newPassword,
                                accountType,
                                livingArea
                            })

                            newUser.save(newUser)
                                .then((user)=>{
                                    const token = jwt.sign({id:user._id},process.env.TOKEN,{expiresIn: "48h"})
                                    return res.send({
                                        success:true,
                                        message:'User Successfully Registered!',
                                        token
                                    })
                                })
                                .catch((err)=>{
                                    console.log(err);
                                    res.send({
                                        success: false,
                                        message: "Unable to add user",
                                    });
                                })
                        })
                    })
            })
            .catch((err) => {
                res.send({
                    success: false,
                    message: err,
                });
            });
    }else{
        return res.json({
            success:false,
            message:"Something went wrong...!"
        })
    }
}


exports.login = (req,res)=>{
    if(req.body){
        const {email,password} = req.body
        User.findOne({email})
            .then((user)=>{
                if(user){
                    bcrypt.compare(password,user.password,(err,result)=>{
                        if(err){
                            console.log(err)
                            return res.json({
                                success:false,
                                message:"Something went wrong"
                            })
                        }

                        if(!result){
                            return res.json({
                                success:false,
                                message:"Invalid Password"
                            })
                        }

                        const token = jwt.sign({ id: user._id }, process.env.TOKEN, {
                            expiresIn: "48h",
                        });

                        return res.json({
                            success:true,
                            message: "User logged in successfully!",
							expiresIn: new Date(
								new Date().getTime() + 172800000
							).getTime(),
							token,
                        })

                    })
                }else{
                    return res.json({
                        success:false,
                        message:"Invalid Email"
                    })
                }

            })
            .catch((err)=>{
                console.log(err.message)
                return res.json({
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

exports.deleteUser = async(req,res)=>{
    if(!req.body){
        return res.json({
            success:false,
            message:"Something went wrong...!"
        })
    }

    const {userId} = req.body
    try {
        const delUser = await User.findByIdAndDelete(userId)
        if(!delUser){
            return res.json({
                success:false,
                message:"Unable to delete user...!"
            })
        }
        const orgByUserId = await Org.findOne({userId})
        if(!orgByUserId){
            return res.json({
                success:true,
                message:"Successfully Deleted User...!"
            })
        }
        const delOrg = await Org.findOneAndDelete({userId})
        if(!delOrg){
            return res.json({
                success:false,
                message:"Unable to delete user...!"
            })
        }
        const orgId = delOrg._id
        const prodByOrg = await Product.findOne({organizationId:orgId})
        if(!prodByOrg){
            return res.json({
                success:true,
                message:"Successfully Deleted User...!"
            })
        }
        const delProd = await Product.deleteMany({organizationId:orgId})
        if(!delProd){
            return res.json({
                success:false,
                message:"Unable to delete user...!"
            })
        }
        return res.json({
            success:true,
            message:"Successfully Deleted User...!"
        })
    } catch (error) {
        return res.json({
            success:false,
            message:"Something went wrong...!"
        })
    }
    
}

exports.updateUser = async(req,res)=>{
    if(!req.body){
        return res.json({
            success:false,
            message:"Something went wrong...!"
        })
    }

    const {userId,username,email,password,livingArea,accountType} = req.body
    verifySignUpData(username,email,password,livingArea,accountType)
        .then(async ()=>{

            bcrypt.hash(password,10).then(async(newPassword)=>{
                const updateObj = {
                    username,
                    email,
                    password:newPassword,
                    livingArea,
                    accountType
                }
            
                try{
                    const updatedUser = await User.findByIdAndUpdate(userId,updateObj,{useFindAndModify:false})
                    if(!updatedUser){
                        return res.json({
                            success:false,
                            message:"Unable to Update User...!"
                        })
                    }
                
                    return res.json({
                        success:true,
                        message:"Successfully Updated User...!"
                    })
                }catch(err){
                    return res.json({
                        success:false,
                        message:"Something went wrong...!"
                    })
                }
            })
        })
        .catch((err)=>{
            return res.json({
                success:false,
                message:err
            })
        })
}