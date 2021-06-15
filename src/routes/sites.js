const express = require('express');
const router = express.Router();
const cartMiddleware = require('../app/middlewares/cartMiddleware')

const sitesController = require('../app/controllers/SitesController');
//middleWare
const renderMiddleware = require('../app/middlewares/renderMiddleware')

router.use(cartMiddleware)
//router se chay tu tren xuogn neu gap dung cai nao thi lay luon cai day
//slug chinh la ngau nhien nhap gi cung duowc
router.get('/search', sitesController.search); //search
router.get('/',renderMiddleware,sitesController.index); // /home

module.exports = router;
