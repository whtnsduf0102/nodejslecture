//패키지
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');

//dotenv
dotenv.config();

//라우터
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const { sequelize } = require('./models');
const passportConfig = require('./passport');

//express , port. view
const app = express();
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});

//데이터베이스 연결
sequelize.sync({ force: false }) 
                //force: true -> 테이블이 지워졌다 다시 생성됨 (데이터들은 지워짐) -> 실무에서는 사용 금지!!!
                //alter: true -> 데이터는 유지하고 테이블 컬럼 변경된것만 반영하고 싶을때사용(가끔 컬럼과 기존데이터들과 안맞아서 에러가 나타남)
    .then(() => {
        console.log('데이터베이스 연결성공');
    })
    .catch((err) => {
        console.error(err);
    });

passportConfig();

//미들웨어
app.use(morgan('dev'));
app.use(express.static( path.join(__dirname, 'public') ));
app.use('/img', express.static( path.join(__dirname, 'uploads') ));
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use(cookieParser( process.env.COOKIE_SECRET ));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));

//express-sessoin 보다 아래에 있어야 하며 미들웨어 라우터보다 위에 있어야함.
app.use(passport.initialize());
app.use(passport.session());

//미들웨어 라우터연결
app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

// 404 처리 미들웨어
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
})

// 에러처리
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
})

// listen port
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});
