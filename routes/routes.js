const express = require('express');
const router = express.Router();

const persistence = require('../module/persistence');

router.get('/', (req, res) => {
    res.render('start');
});

router.get('/neu', (req, res) => {
    res.render('neueAbstimmung');
})

module.exports = router;