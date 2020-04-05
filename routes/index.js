const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');


// different routes to cater to different functionalities of the app
router.get('/',homeController.home);
router.post('/upload',homeController.upload);
router.get('/:avatar',homeController.getCSV);
router.post('/:avatar/search',homeController.search);
router.get('/sort/:index',homeController.sort);
module.exports = router;