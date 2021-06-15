const Course = require('../models/Courses')

class MeController {
    // [get] /me/courses
    index(req,res,next){
        let courseQuery =  Course.find({}).lean()

        if(req.query.hasOwnProperty('_sort')){
            courseQuery = courseQuery.sort({
                [req.query.colum] : req.query.type
            })
        }

        Promise.all([Course.countDocumentsDeleted(),courseQuery])
            .then(([courseDeleted,courses])=>{ //destructuring
                res.render('me/course',{
                    courses: courses,
                    courseDeleted,
                })
            })
            .catch(next)

    }
    // [get] /me/trash/course
    trash(req, res, next) {
        Course.findDeleted({}).lean()
        .then((courses)=>{
            res.render('me/courseDeleted',{
                courses: courses,
            })
        })
        .catch(err=>next(err))
    }
}

module.exports = new MeController();
