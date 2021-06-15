const newRouter = require('./news');
const sitesRouter = require('./sites');
const courseRouter = require('./course');
const meRouter = require('./me');
const userRouter = require('./user');

function route(app) {
    //render trang new
    app.use('/news', newRouter);
    //course
    app.use('/course', courseRouter); 
    //me
    app.use('/me',meRouter);
    //login
    app.use('/user',userRouter);
    //trang home va search
    app.use('/', sitesRouter); //nhunwg path chi co / thi dua xuong duoi cung
}

module.exports = route;
