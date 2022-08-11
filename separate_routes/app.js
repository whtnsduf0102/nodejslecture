const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const inboxRouter = require('./routes');
const userRouter = require('./routes/user');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'separate_routes')));
app.use(express.json());
app.use(express.urlencoded( {extended: false} ));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));

app.use('/', inboxRouter);
app.use('/user', userRouter);

/*요청과 일치하는 라우터가 없는 경우를 대비해 404 라우터를 만들기*/
app.use( ( req, res, next ) => {
    res.status(400).send('Not Found');
})
/*-----------------------------------------------------------*/

app.use( ( err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
})

app.listen(app.get('port'), () =>{
    console.log(app.get('port'), '번 포트에서 대기중..')
})