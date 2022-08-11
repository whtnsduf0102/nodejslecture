const express = require('express');
const path = require('path'); //경로처리
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');
const dotenv = require('dotenv');

const app = express();

dotenv.config();
app.set('port', process.env.PORT || 3000); //port를 전역변수로 사용

app.use(morgan('dev')); //서버에서 어떤 요청이 왔는지 콘솔에 나타남 ex> GET / 200 12.016 ms - 207
//app.use(morgan('combined'));  //조금더 자세히 나옴.
//app.set('요청경로', express.static(__dirname, '실제경로'));  순서 중요!!!
//app.set('/', express.static(__dirname, 'express')); //static 미들웨어
app.use(cookieParser(process.env.COOKIE_SECRET)); //res.cookies 
app.use(sesssion({
    resave: false,
    saveUnintitialized: false,
    secret: process.env.COOKIE_SECRET, // .env 파일에 COOKIE_SECRET 저장
    cookie:{
        httpOnly: true,
    },
    name: 'connect.sid',
}));
/** static 미들웨어 확장법 --------------------------------
app.use('/',( req, res, next ) => { 
    if(req.session.id){//로그인아이디가 있을때
        express.static(__dirname, 'express')(req, res, next)
    } else {
        naxt();
    }
});
------------------------------------------------------------*/
app.use(express.json());
app.use(express.urlencoded({ extends: true })); // true(추천) : qs, false: querystring

/**express-session -------------------------------- 
app.get('/', (req, res ) => {
    req.session.id = 'hello'; //개인의 저장공간
});
------------------------------------------------ */

/* cookieParser 예시----------------
app.get('/', (req, res ) => {
    res.cookies
    req.signedCookies; // 쿠키를 암호화 할수 있음
    // 'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`, 
    res.cookie('name', encodeURIComponent(name),{
        expires: new Date(),
        httpOnly: true,
        path: '/',
    })
    res.clearCookie('name', encodeURIComponent(name),{ //쿠키삭제
        httpOnly: true,
        path: '/',
    })
    res.sendFile(path.join(__dirname, '/index.html'));
});
--------------------------------------*/

// app.use((req, res, next) => {
//     console.log('모든요청에 다 실행됩니다.');
//     next();
// })

/*미들웨어를 연달아 사용가능
app.use((req, res, next) => {
    console.log('1요청에 다 실행됩니다.');
    next();
}, (req, res, next) => {
    console.log('2요청에 다 실행됩니다.');
    next();
}, (req, res, next) => {
    console.log('3요청에 다 실행됩니다.');
    next();
})
---------------------------------------------*/
 

app.use((req, res, next) => {
    console.log('모든요청에 다 실행됩니다.');
    next();
})
//}, (req, res, next) => {
//        try{
//            console.log(asfasfasf); //고의에러
//        } catch (error) {
//            next(error); //next 의 인수가 error 일때 에러처리 미들웨어로 넘어감
//        }
//    })
/*에러생성 강제*/
// }, (req, res, next) => {
//     throw new Error('에러가 났어요');
// })
/*------------------------------------------*/

app.use('/about', (req, res, next) => {
    console.log('/about의 모든요청에 다 실행됩니다.');
    next();
})

app.use((req, res, next) => {
    req.session.data = 'expasswords' // 나의 한에서 요청을 자꾸 보내도 나라는 것을 기억하며 계속 유지해야 할때
    req.data = 'expasswords2' //요청한번만 할때
})

app.get('/', (req, res ) => {
    req.session.data //expasswords
    req.data //expasswords2 
    // res.send('Hello, Express');
    res.sendFile(path.join(__dirname, '/index.html')); //path 모듈을 사용 html 서빙
/* next 분기처리 예시--------
    if ( true ) {
        next('route');
    } else {
        next();
    }
    -----------------------*/
});
/* next 분기처리 예시--------
app.get('/', (req, res ) => {
    console.log('next 분기 !!')
});
 -----------------------*/
app.post('/', (req, res ) => {
    res.send('hello express!');
});

app.get('/category/Javascript', (req, res ) => {
/* express 제공 ------------------------------------------
    res.writeHead(200, {'Content-Type': 'applicaton.json'});
    res.end(JSON.stringify({hello: 'sunyeol'}));
      *위 2줄을 아래 한줄로 express 에서 표현*
    res.json({hello: 'sunyeol'});
--------------------------------------------------------*/
    res.send('hello Javascript');
});

app.get('/about', (req, res ) => {
    //res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'}); -> http 식
    res.setHeader('Content-Type', 'text/html'); //express 식
    res.send('hello express');
});

/*----------------------------------------------
  **범위가 넓은 라우터들은 아래쪽에 배치해야 한다.*/
app.get('/category/:name', (req, res ) => {
    //res.send(`hello ${req.params.name}`);
    res.send('hello wildCard')
});

// app.get('*', (req, res ) => {
//     res.send('hello everybody');
// });
/*-----------------------------------------------*/

app.use((req, res, next) => { //404처리 미들웨어
    //res.status(200).send('400,500 에러나면 200으로 브라우져로 뻥칠수 있음 , status(200) 은 생략가능 디폴트: 200');
    res.send('404에러!!!!!')
})

app.use((err, req, res, next) => { // 에러미들웨어는 err, req,res, next 항상 4개여야 한다
    console.error(err);
    res.status(200).send('에러다!!!!!!!!!')
})

// app.listen(app.get('port'), () => {
//     console.log(app.get('port'), '번 포트에서 대기 중');
// });

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행!')
})