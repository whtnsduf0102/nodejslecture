const express = require('express');
const path = require('path'); //경로처리
const morgan = require('morgan');
const pug = require('pug');
const bodyParser = require('body-parser');

const app = express();


app.set('port', process.env.PORT || 3010); 
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('smallproject'));

app.get('/', (req, res ) => { 
    res.render('form')
});
app.use('/from_receiver', (req, res, next) => { //method 분기 하기 post 만 빼고 나머진 오류
    if(req.method === 'POST'){
        next();
    } else {
        res.status(400).send('POST method 만 허용됩니다.');
    }
});

app.post('/from_receiver', (req, res ) => {
    const title = req.body.title;
    const description = req.body.description;
    res.send(title + ',' + description + " -> post 성공");
});

/* 에러처리  */
app.use((req, res, next) => { //404처리 
    res.send('404에러!!!!!')
})

app.use((err, req, res, next) => { // 500에러처리
    console.error(err);
    res.status(200).send('에러다!!!!!!!!!')
})

app.listen(app.get('port'), () => {
    console.log('스몰프로젝트 실행!!')
})