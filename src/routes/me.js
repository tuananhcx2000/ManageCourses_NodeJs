const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

const loginMiddleware = require('../app/middlewares/loginMiddlewares');

//router se chay tu tren xuogn neu gap dung cai nao thi lay luon cai day
//slug chinh la ngau nhien nhap gi cung duowc
// router.get('/course', courseController.create); // /course/create
// router.post('/store', courseController.store); // /course/store
router.get('/course', loginMiddleware, meController.index); // /news/....
router.get('/trash/course', meController.trash); // /me/trash/course

module.exports = router;
