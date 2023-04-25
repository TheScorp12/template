const User = require('../models/user')

exports.login = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    User.find({email : email, password: password})
        .then(result => {
            if(result.length > 0){
                res.send(result)
            }else{
                res.send("user not found")
            }
        })
}

exports.register = (req, res ,next) => {
    const email = req.body.email
    const password = req.body.password
    const newUser = new User({email, password})
    newUser.save()
            .then(result => {
                res.send(result)
            }).catch(err => {
                console.log(err)
                res.send("user not created")
            })
}