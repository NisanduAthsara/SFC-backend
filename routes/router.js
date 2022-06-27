const express = require('express')
const router = express.Router()
const {signup,login,deleteUser,updateUser} = require('../controller/user.loginSignup')
const {getUserId,getUserById,buyerAuthMiddleware,sellerAuthMiddleware,authMiddleware,checkUserToken,checkSellerToken} = require('../controller/user.auth')
const {createOrg,findOrg,deleteOrg,updateOrg} = require('../controller/org.controller')
const {getOrgId,getOrgById,checkOrgTokenMiddleware,checkOrgToken} = require('../controller/org.auth')
const {newProduct,findProducts,findSpecificProduct,deleteProduct,updateProduct} = require('../controller/product.controller')
const {findAllProducts,findProductBySellItem,findProductByArea,userFindSpecificProduct,findProductByAreaAndType} = require('../controller/buyer.controller')

//All User Routes
router.post('/signup',signup)
router.post('/login',login)
router.post('/getUserId',authMiddleware,getUserId)
router.post('/getUser',authMiddleware,getUserById)
router.post('/checkUserToken',checkUserToken)
router.post('/checkSellerToken',checkSellerToken)
router.put('/updateUser',authMiddleware,updateUser)
router.delete('/deleteUser',authMiddleware,deleteUser)

//Organization Routes
router.post('/orgSignup',sellerAuthMiddleware,createOrg)
router.post('/getOrgId',checkOrgTokenMiddleware,getOrgId)
router.post('/getOrgById',checkOrgTokenMiddleware,getOrgById)
router.post('/checkOrgToken',checkOrgToken)
router.post('/findOrg',sellerAuthMiddleware,findOrg)
router.put('/updateOrg',checkOrgTokenMiddleware,updateOrg)
router.delete('/deleteOrg',checkOrgTokenMiddleware,deleteOrg)

//Product Routes
router.post('/newProduct',checkOrgTokenMiddleware,newProduct)
router.post('/findProducts',checkOrgTokenMiddleware,findProducts)
router.post('/findSpecificProduct',checkOrgTokenMiddleware,findSpecificProduct)
router.put('/updateProduct',checkOrgTokenMiddleware,updateProduct)
router.delete('/deleteProduct',checkOrgTokenMiddleware,deleteProduct)

//Buyer Routes
router.post('/findAllProducts',buyerAuthMiddleware,findAllProducts)
router.post('/findProductBySellItem',buyerAuthMiddleware,findProductBySellItem)
router.post('/findProductByArea',buyerAuthMiddleware,findProductByArea)
router.post('/userFindSpecificProduct',buyerAuthMiddleware,userFindSpecificProduct)
router.post('/findProductByAreaAndType',buyerAuthMiddleware,findProductByAreaAndType)

module.exports = router