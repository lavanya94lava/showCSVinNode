const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/',homeController.home);
router.post('/upload',homeController.upload);
router.get('/:avatar',homeController.getCSV);
module.exports = router;