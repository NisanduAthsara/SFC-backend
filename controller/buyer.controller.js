const Product = require('../models/product.model')
const Org = require('../models/orginization.model')
const {checkProductType} = require('../utils/buyer.funcs')

exports.findAllProducts = async(req,res)=>{
    const products = await Product.find()
    if(!products){
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

exports.findProductBySellItem = async(req,res)=>{
    if(!req.body){
        return res.json({
            success:false,
            message:"Something went wrong...!"
        })
    }

    const {reqItem} = req.body
    const products = await Product.find()
    if(!products){
        return res.json({
            success:true,
            message:"No Products...!"
        })
    }

    const filteredItems = products.filter((item)=>{
        const itemType = checkProductType(item.brand)
        if(itemType == reqItem){
            return item
        }
    })

    if(filteredItems.length < 1){
        return res.json({
            success:true,
            message:'No Products Found...!'
        })
    }

    return res.json({
        success:true,
        allProducts:filteredItems
    })
}

exports.findProductByArea = async(req,res)=>{
    if(!req.body){
        return res.json({
            success:false,
            message:"Something went wrong...!"
        })
    }

    const {area} = req.body

    const allProducts = await Product.find()
    if(!allProducts){
        return res.json({
            success:true,
            message:'No Products Found...!'
        })
    }

    let idOrgArr = []

    for(let prod of allProducts){
        if(!idOrgArr.includes(prod.organizationId)){
            idOrgArr.push(prod.organizationId)
        }
    }

    if(idOrgArr < 1){
        return res.json({
            success:true,
            message:'No Products Found...!'
        })
    }

    let orgs = []

    for(let id of idOrgArr){
        let organization = await Org.findById(id)
        if(!organization){
            return res.json({
                success:true,
                message:'No Products Found...!'
            })
        }

        if(organization.city == area){
            orgs.push(id)
        }
    }

    let finalProducts = []
    for(let orgId of orgs){
        const finalProduct = await Product.find({organizationId:orgId})
        if(!finalProduct){
            return res.json({
                success:true,
                message:'No Products Found...!'
            })
        }
        finalProducts.push(finalProduct)
    }

    if(finalProducts.length < 1){
        return res.json({
            success:true,
            message:'No Products Found...!'
        })
    }

    return res.json({
        success:true,
        products:finalProducts
    })
}


exports.userFindSpecificProduct = async(req,res)=>{
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
            success:true,
            message:'No Products Found...!'
        })
    }

    return res.json({
        success:true,
        product
    })
}