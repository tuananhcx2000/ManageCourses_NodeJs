const path = require('path');
const express = require('express');
const router = express.Router();
//middleware read data from req obj
var multer  = require('multer')
var upload = multer({ dest: path.resolve(__dirname, '../public/uploads') })

//middleWare
// const renderMiddleware = require('../app/middlewares/renderMiddleware')

const courseController = require('../app/controllers/CourseController');

//router se chay tu tren xuogn neu gap dung cai nao thi lay luon cai day
//slug chinh la ngau nhien nhap gi cung duowc
router.get('/create', courseController.create); // /course/create
router.get('/addCart/:slug' , courseController.addCart); // /course/addCart/slug
router.post('/store',upload.single('image') ,courseController.store); // /course/store
router.post('/handle-select-event', courseController.handleSelect); // /course/handle-select-event
router.get('/:id/edit', courseController.edit); // /course/:id/edit
router.post('/:id/edit', courseController.update); // /course/:id/edit
router.post('/:id/delete', courseController.delete); // /course/:id/delete
router.post('/:id/restore', courseController.restore); // /course/:id/delete
router.post('/:id/ForceDelete', courseController.ForceDelete); // /course/:id/delete
router.get('/:slug', courseController.index); // /news/....

module.exports = router;
