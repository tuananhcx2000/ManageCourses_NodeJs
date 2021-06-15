const Session = require('../models/Sessions')
const shortid = require('shortid');

module.exports = function(req,res,next){
    // console.log(req.cookies.userId)
    if(!req.cookies.userId){
        var sessionId = shortid.generate()
        res.cookie('userId', sessionId)
    }
    const data = {
        id : req.cookies.userId || sessionId,
    }
    let slugId = req.cookies.slug
    // console.log(slugId)

    Session.findOne({id:data.id}).lean()
        .then(data=>{
            //lay value cua obj roi cong het vao
            res.locals.countCart = Object.values(data.cart).reduce((count,item)=>{
                return count+=item;
            },0)
        })
        .catch(next)
    next()
}