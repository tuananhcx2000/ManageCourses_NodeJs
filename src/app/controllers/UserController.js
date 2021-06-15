const User = require('../models/Users')

class UserController {
    // [get] /user/courses
    index(req,res,next){
        res.render('user/login')
    }
    login(req,res,next){
        let email = req.body.email;
        let pass = req.body.pass;

        let user = User.findOne({userName: email}).lean()
        user
            .then((user)=>{
                if(!user){
                    res.render('user/login',{
                        message: 'No account'
                    })
                    return
                }
                if(pass !== user.passWord){
                    res.render('user/login',{
                        message: 'Password is incorrect'
                    })
                    return
                }
                console.log(user._id)
                res.cookie('userId',user._id)
                // console.log(req.cookie.userId)
                res.redirect('/me/course')
                // res.json(user)
            })
            .catch(next)
        
    }
}

module.exports = new UserController();
