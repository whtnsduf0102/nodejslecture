const express = require('express');
const User = require('../schemas/user');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const users = await User.find({});
        res.render('mongoose', { users });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;


//롤백테스트입니다.2번째