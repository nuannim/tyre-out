//* import express
const express = require('express');

const router = express.Router();

const path = require('path'); //* import path

//* create directory 'public'
router.use(express.static('public'));
router.use(express.static('images'));


router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/home.html'));
});

router.get('/cat', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/cat.html'));
});

module.exports = router;
