const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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

const multer = require('multer');
const fs = require('fs');

/* uploads 폴더가 없으면 uploads 폴더 생성 */
try {
    fs.readdirSync('uploads'); // 서버 시작전에 폴더가 있는지 없는지 확인하고 만드는것이기 때문에 싱크를 써도 됨.
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}
/*-----------------------------------------------------------------*/

const upload = multer({
    storage: multer.diskStorage({ //어디에 업로드 할것인지, diskStorage :하드디스크에 업로드 파일을 저장한다는 것
        destination(req, file, done) { // destination: 저장할 경로
            done(null, 'uploads/');
        },
        filename(req, file, done) { //무슨 이름으로 업로드 할것인지, filename:저장할 파일명(파일명+날짜+확장자 형식)
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext); //파일 중복을 방지하기위에 데이트를 넣음.
            //done(null, ????) -> 에러처리는 done(error, ????)
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, //5mb 제한 , Limits: 파일 개수나 파일 사이즈를 제한할 수 있음.
});

// /upload 라우터에 장착
app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'multipart.html'));
});
app.post('/upload', upload.single('image1'), (req, res) => { //아래 주석 참조 upload
    console.log(req.file);
    res.send('ok');
});

/* upload -> single, none, array, fields */
/*============================================================================*/
//   -->upload.single('image') 한개의 파일만 업로드할때 
// app.post('/upload', upload.single('image1'), (req, res) => { 
//     console.log(req.file);
//     res.send('ok');
// });
/*============================================================================*/
//   -->upload.none() 파일은 업로드 하지 않을때 => 언제쓰이는지 정확히 모르겠음.
// app.post('/upload', upload.none(), (req, res) => { 
//     console.log(req.body);
//     res.send('ok');
// });
/*============================================================================*/
//   -->upload.array('many') 하나의 요청 body 이름 아래 여러파일이 있는 경우
// app.post('/upload', upload.array('many'), (req, res) => { 
//     console.log(req.file, req.body);
//     res.send('ok');
// });
/*============================================================================*/
//   -->upload.fields( [{ name:'image1' }, { name:'image1' }] ) 
//      여러개의 요청 body 이름 아래 파일 하나씩 있는경우
// app.post('/upload', upload.fields( [{ name:'image1' }, { name:'image1' }] ), (req, res) => { 
//     console.log(req.file, req.body);
//     res.send('ok');
// });
/*============================================================================*/

/*========================에러처리===========================*/
app.get('/', (req, res, next) => {
    console.log('GET / 요청에서만 실행됩니다.');
    next();
}, (req, res) => {
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
});
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});
/*========================에러처리끝===========================*/

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});