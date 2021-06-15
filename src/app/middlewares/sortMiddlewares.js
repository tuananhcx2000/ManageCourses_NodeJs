module.exports = function(req,res,next){
    res.locals._sort = {
        enable: false,
        type: 'default',
    }
    if(req.query.hasOwnProperty('_sort')){
        Object.assign(res.locals._sort,{
            enable: true,
            type: req.query.type,
            colum: req.query.colum,
        })
    }
    next()
}