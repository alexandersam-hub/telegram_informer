const {Router} = require('express')
const messageController = require('../controllers/messageController')

const router = new Router()

router.post('/send',messageController.getMessage)


module.exports = router