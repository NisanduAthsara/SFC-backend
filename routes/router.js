const express = require('express')
const router = express.Router()
const {signup,login} = require('../controller/user.loginSignup')
const {getUserId,getUserById,authMiddleware,checkToken} = require('../controller/user.auth')
const {createOrg} = require('../controller/org.controller')

//All User Routes
router.post('/signup',signup)
router.post('/login',login)
router.post('/getUserId',authMiddleware,getUserId)
router.post('/getUser',authMiddleware,getUserById)
router.post('/checkToken',checkToken)

//Organization Routes
router.post('/orgSignup',createOrg)

module.exports = router