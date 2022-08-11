const express = require('express');

const router = express.Router();

// GET / 라우터
router.get('/', (req, res) => {
    res.send('Hello, Express');
});

module.exports = router;

/* 라우트 주소는 같지만 메서드가 다를 때 2가지 작성방법 */
/*--------------------------------------------------
router.get('/abc', (req, res) => {
    res.send('GET /abc');
});
router.post('/abc', (req, res) => {
    res.send('POST /abc');
});
----------------------------------------------------
router.route('/abc')
    .get((req, res) => {
        res.send('GET /abc');
    })
    .post((req, res) => {
        res.send('POST /abc');
    });
--------------------------------------------------*/