const userController = require('../controllers/userController')
const express = require('express')
const multer  = require('multer')

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        var dest = 'images/';
        cb(null, dest);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

const router = express.Router()

router.get('/', (req, res, next) => {
    res.send("hello world")
}) 

router.post('/login', userController.login)
router.post('/register', userController.register)
router.post('/file', upload.single('file'), (req, res ,next) => {
    console.log(req.file)
    res.send('success')
})
module.exports = router  