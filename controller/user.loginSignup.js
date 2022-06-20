const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {verifySignUpData} = require('../utils/funcs')

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
        console.log(req.body)
        return res.json({
            success:false,
            message:"Something went wrong...!"
        })
    }
}