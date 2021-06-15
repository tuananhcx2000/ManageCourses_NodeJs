const Course = require('../models/Courses')

class SitesController {
    // [get] /home
    index(req, res, next) {
        let page = Number(req.query.page) || 1;
        let perPage = 3;

        let start = (page - 1) * perPage;
        let end = page * perPage;

        // Course.find({}).slice(start,end)
        //     .then(courses => {
        //         courses = courses.map(course => course.toObject()); //bth mongoose se tra ve 1 object tao ra tu functionconstructor lam cai nay de chuyen ve bth
        //         res.render('home',{                                //1 ban ghi thi toObject() luon k can map
        //             courses: courses
        //         });
        //     })
        //     .catch(err => next(err))
        Course.find({}).lean()
            .then(courses => {
                courses = courses.slice(start,end) //pagination
                res.render('home',{                              
                    courses: courses
                });
            })
            .catch(err => next(err))
    };
    // [get] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SitesController();
