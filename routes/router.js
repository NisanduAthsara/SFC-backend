const express = require('express')
const router = express.Router()
const {signup,login} = require('../controller/user.loginSignup')
const {getUserId,getUserById,authMiddleware,checkUserToken} = require('../controller/user.auth')
const {createOrg,findOrg} = require('../controller/org.controller')
const {getOrgId,getOrgById,checkOrgTokenMiddleware,checkOrgToken} = require('../controller/org.auth')

//All User Routes
router.post('/signup',signup)
router.post('/login',login)
router.post('/getUserId',authMiddleware,getUserId)
router.post('/getUser',authMiddleware,getUserById)
router.post('/checkUserToken',checkUserToken)

//Organization Routes
router.post('/orgSignup',authMiddleware,createOrg)
router.post('/getOrgId',checkOrgTokenMiddleware,getOrgId)
router.post('/getOrgById',checkOrgTokenMiddleware,getOrgById)
router.post('/checkOrgToken',checkOrgToken)
router.post('/findOrg',authMiddleware,findOrg)

module.exports = router