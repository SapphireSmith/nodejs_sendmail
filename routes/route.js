const express = require('express')
const { signUp, getBill } = require('../controller/controller.js')
const router = express.Router()

/**HTTP requests */
router.post('/user/signup', signUp);
router.post('/item/getbill', getBill)


module.exports = router