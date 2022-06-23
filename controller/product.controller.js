const Product = require('../models/product.model')
const {checkProduct} = require('../utils/product.funcs')

exports.newProduct = async(req,res)=>{
    if(!req.body){
        return res.json({
            success:false,
            message:"Something went wrong...!"
        })
    }

    const {productName, brand, status, organizationId, imgLink, nextComingDate} = req.body
    checkProduct(productName, brand, status, organizationId, imgLink, nextComingDate)
        .then(async (result)=>{
            const prev = await Product.countDocuments({organizationId})
            if(prev > 9){
                return res.json({
                    success:false,
                    message:"You can only add 10 items...!"
                })
            }
            const productObj = new Product({
                productName, 
                brand, 
                status, 
                organizationId, 
                imgLink, 
                nextComingDate
            })

            const nProduct = await productObj.save(productObj)
            if(!nProduct){
                return res.json({
                    success:false,
                    message:"Something went wrong...!"
                })
            }
            return res.json({
                success:true,
                message:"Successfully Product Added...!"
            })
        })
        .catch((err)=>{
            return res.json({
                success:false,
                message:err
            })
        })
}

exports.findProducts = async(req,res)=>{
    if(!req.body){
        return res.json({
            success:false,
            message:"Something went wrong...!"
        })
    }
    const {orgId} = req.body
    const products = await Product.find({organizationId:orgId})
    if(!products){
        return res.json({
            success:true,
            message:"No Products...!"
        })
    }

    if(products.length < 1){
        return res.json({
            success:true,
            message:"No Products...!"
        })
    }

    return res.json({
        success:true,
        products
    })
}

exports.findSpecificProduct = async (req,res)=>{
    if(!req.body){
        return res.json({
            success:false,
            message:"Something went wrong...!"
        })
    }

    const {productId} = req.body
    const product = await Product.findById(productId)
    if(!product){
        return res.json({
            success:false,
            message:"Product Not Found...!"
        })
    }

    if(product.length < 1){
        return res.json({
            success:true,
            message:"No Products...!"
        })
    }

    return res.json({
        success:true,
        product
    })
}

exports.deleteProduct = async(req,res)=>{
    if(!req.body){
        return res.json({
            success:false,
            message:"Something went wrong...!"
        })
    }

    const {productId} = req.body

    try{
        const delProduct = await Product.findByIdAndDelete(productId)
        if(!delProduct){
            return res.json({
                success:false,
                message:"Unable to Delete Product...!"
            })
        }
        return res.json({
            success:true,
            message:"Successfully Deleted Product...!"
        })
    }catch(err){
        return res.json({
            success:false,
            message:"Something went wrong...!"
        })
    }
}

exports.updateProduct = async(req,res)=>{
    if(!req.body){
        return res.json({
            success:false,
            message:"Something went wrong...!"
        })
    }
    const {productName, brand, status, organizationId, imgLink, nextComingDate,productId} = req.body
    checkProduct(productName, brand, status, organizationId, imgLink, nextComingDate)
        .then(async()=>{
            const newObj = {
                productName, 
                brand, 
                status, 
                organizationId, 
                imgLink, 
                nextComingDate
            }

            try{
                const updatedProduct = await Product.findByIdAndUpdate(productId,newObj,{useFindAndModify:false})
                if(!updatedProduct){
                    return res.json({
                        success:false,
                        message:"Unable to Update Product...!"
                    })
                }

                return res.json({
                    success:true,
                    message:"Successfully Updated Product...!"
                })
            }catch(err){
                return res.json({
                    success:false,
                    message:"Something went wrong...!"
                })
            }
        })
        .catch((err)=>{
            return res.json({
                success:false,
                message:err
            })
        })
}