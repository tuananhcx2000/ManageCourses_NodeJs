const Course = require('../models/Courses')
const Session = require('../models/Sessions')

class CourseController {
    // [get] /course/:slug
    index(req,res,next){
        Course.findOne({slug: req.params.slug}).lean() //.lean() de chuyen no tu obj tao tu functionContructor sang obj bth
            .then(course=> {
                res.render('course/show',{
                    course : course
                })
            })
            .catch(err=>next(err))
    }
    // [get] /course/create
    create(req,res,next){
        res.render('course/create')
    }
    // [get] /course/store
    store(req,res,next){
        const formData = {...req.body};
        //res.json(formData)
        // formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        formData.image = req.file.path .split("\\").slice(8).join("\\");
        const course = new Course(formData);
        course.save()

        res.redirect('/me/course')
    }
     // [get] /course/:id/edit
    edit(req,res,next){
        Course.findById(req.params.id).lean()
            .then(course=>{
                // console.log(course)
                res.render('course/edit',{
                    course:course,
                })
            })
            .catch(next)
    }
    // [Post] /course/:id/edit
    update(req,res,next){
        Course.updateOne({_id : req.params.id},req.body)
            .then(()=>{res.redirect('/me/course')})
            .catch(next)
    }
    // [Post] /course/:id/delete
    delete(req,res,next){
        Course.delete({_id : req.params.id})
            .then(()=>{res.redirect('/me/course')})
            .catch(next)
    }
    // [Post] /course/:id/delete
    restore(req,res,next){
        Course.restore({_id : req.params.id})
            .then(()=>{res.redirect('/me/trash/course')})
            .catch(next)
    }
    // [Post] /course/:id/delete
    ForceDelete(req,res,next){
        Course.deleteOne({_id : req.params.id})
            .then(()=>{res.redirect('/me/trash/course')})
            .catch(next)
    }
    // [Post] /course/:id/delete
    handleSelect(req,res,next){
        switch(req.body.action){
            case 'delete':
                if(Array.isArray(req.body.courseId)){
                    for( let item of req.body.courseId){
                        Course.delete({_id : item})
                            .then(()=>{res.redirect('/me/course')})
                            .catch(next)
                    }
                }
                else{
                    Course.delete({_id : req.body.courseId})
                            .then(()=>{res.redirect('/me/course')})
                            .catch(next)
                }
                break;
            default:
                res.json({message:'Your action is invalid'})
        }
    }
    addCart(req,res,next){
        let slugCourse = req.params.slug;
        let sessionId = req.cookies.userId;
        let count ;
        // console.log(slugCourse)
        if(!sessionId){
            res.redirect('/')
            return
        }
        
        res.cookie('slug',slugCourse)
        //update
        Session.findOne({id:sessionId}).lean()
            .then(session=>{
                    count = session.cart[slugCourse] || 0
                    // console.log(count)
                    let objCart = session.cart;
                    
                    Session.updateOne({id:sessionId},{
                                cart: {
                                    ...objCart,
                                    [slugCourse] : count+1,
                                }
                            }).lean()
                            .then(data=>{
                                // res.json(data)
                            })
                            .catch(next)

            })
            .catch(next)
        //render data
        

        res.redirect('/')
    }
}

module.exports = new CourseController();
