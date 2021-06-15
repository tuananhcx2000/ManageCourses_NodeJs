const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/NewsController');

//router se chay tu tren xuogn neu gap dung cai nao thi lay luon cai day
//slug chinh la ngau nhien nhap gi cung duowc
router.get('/:slug', newsController.show); // /news/....
router.get('/', newsController.index); // /news macdinh

module.exports = router;
