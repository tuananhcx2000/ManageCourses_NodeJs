const User = require('../models/Users')

module.exports = function(req,res,next){
    if(!req.cookies.userId){
        // console.log('noooooooo')
        res.redirect('/user/login')
        return
    }
    User.findOne({_id:req.cookies.userId}).lean()
        .then(user=>{
            if(!user){
                res.redirect('/user/login')
            }
            else{

                res.locals.userName = user.userName
            }
        })
        .catch(next)
    next()
}