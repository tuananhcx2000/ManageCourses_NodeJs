//khai bao thu vien
require('dotenv').config();
const express = require('express');
// const morgan = require('morgan');
const handlebars = require('express-handlebars');
const sortMiddleware = require('./app/middlewares/sortMiddlewares');
const cookieParser = require('cookie-parser');
// var methodOverride = require('method-override');
const app = express();
const path = require('path');

const db = require('./config/db');

//Connect to db
db.connect();

const route = require('./routes/index'); //k can viet index vi nos tu dong tim den index r
const port = process.env.PORT || 3000;


//http logger
// app.use(morgan('combined'))

//apply middleware để render dữ liệu từ form post lên
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// app.use(methodOverride('_method'))
//user middleware parse
app.use(cookieParser()) //to read data from req.cookie
//template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {      // tao cac function render ow day
            sum: (a,b)=>a+b,
            sort: (field, sortObj)=>{
                let sortType = field === sortObj.colum ? sortObj.type : 'default'
                icons = {
                    default: '<i class="fas fa-sort"></i>',
                    asc: '<i class="fas fa-sort-amount-up"></i>',
                    desc: '<i class="fas fa-sort-amount-down-alt"></i>',
                }
                types = {
                    default: 'asc',
                    asc: 'desc',
                    desc: 'asc'
                }
                let icon = icons[sortType]
                let type = types[sortType]
                return `
                <a href="?_sort&colum=${field}&type=${type}">
                    ${icon}
                </a>`
            },
        }
    }),
); //handlebars config
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource','views')); //set folder view default(join nhan nhieu doi so va noi vao nhau)
// console.log(__dirname);

//nhung file tinh
app.use(express.static(path.join(__dirname, '\\public')));

//custom middleware
app.use(sortMiddleware)

//cau hinh cac route
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
