const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');
// [get]
router.get('/login', userController.index); // /news/....
// post[]
router.post('/login', userController.login); 

module.exports = router;
