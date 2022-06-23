const express = require('express')
const router = express.Router()
const {signup,login,deleteUser,updateUser} = require('../controller/user.loginSignup')
const {getUserId,getUserById,authMiddleware,checkUserToken} = require('../controller/user.auth')
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
router.put('/updateUser',authMiddleware,updateUser)
router.delete('/deleteUser',authMiddleware,deleteUser)

//Organization Routes
router.post('/orgSignup',authMiddleware,createOrg)
router.post('/getOrgId',checkOrgTokenMiddleware,getOrgId)
router.post('/getOrgById',checkOrgTokenMiddleware,getOrgById)
router.post('/checkOrgToken',checkOrgToken)
router.post('/findOrg',authMiddleware,findOrg)
router.put('/updateOrg',checkOrgTokenMiddleware,updateOrg)
router.delete('/deleteOrg',checkOrgTokenMiddleware,deleteOrg)

//Product Routes
router.post('/newProduct',checkOrgTokenMiddleware,newProduct)
router.post('/findProducts',checkOrgTokenMiddleware,findProducts)
router.post('/findSpecificProduct',checkOrgTokenMiddleware,findSpecificProduct)
router.put('/updateProduct',checkOrgTokenMiddleware,updateProduct)
router.delete('/deleteProduct',checkOrgTokenMiddleware,deleteProduct)

//Buyer Routes
router.post('/findAllProducts',authMiddleware,findAllProducts)
router.post('/findProductBySellItem',authMiddleware,findProductBySellItem)
router.post('/findProductByArea',authMiddleware,findProductByArea)
router.post('/userFindSpecificProduct',authMiddleware,userFindSpecificProduct)
router.post('/findProductByAreaAndType',authMiddleware,findProductByAreaAndType)

module.exports = router