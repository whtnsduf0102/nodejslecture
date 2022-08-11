const express = require('express');

const router = express.Router();

// GET / 라우터
router.get('/', (req, res) => {
    res.send('Hello, Express');
});

module.exports = router;

/* 라우트매개변수 */
/*--------------------------------------------------
// :id 를 넣으면 req.params.id로 받을수있음.
router.get('/user/:id', function(req, res) {
    console.log(req.params, req.query);
});
----------------------------------------------------
// 일반라우터 보다 뒤에 위치해야 함.
router.get('/user/:id', function(req, res) {
    console.log('여기서만 실행이 됨!!');
});
router.get('/user/like', function(req, res) {
    console.log('실행되지 않음!!!');
});
--------------------------------------------------*/

/* 라우트 주소는 같지만 메서드가 다를  때 2가지 작성방법 */
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