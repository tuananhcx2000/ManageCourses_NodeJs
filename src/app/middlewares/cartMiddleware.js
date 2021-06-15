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
    Session.findOne({id:data.id}).lean()
        .then((session)=>{
            if(!session){
                const session = new Session(data);
                session.save()
            }
            
        })
        .catch(next)
    next()
}