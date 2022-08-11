const mongoose = require('mongoose');

const connect = () => {
    if (process.env.NODE_ENV !== 'production') { // 개발할때 
        mongoose.set('debug', true);             //터미널에 쿼리를 확인 할수 있음.
    }
    mongoose.connect('mongodb://localhost:27017/admin', {
        dbName: 'nodejs',
        useNewUrlParser: true,
        //useCreateIndex: true, //활성화 하면 몽고디비가 연결이 안됨. -> 몽구스 6버전에서 사라진 옵션
    }, (error) => {
    if (error) {
    console.log('몽고디비 연결 에러', error);
    } else {
    console.log('몽고디비 연결 성공');
    }
    });
  };
  

mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러', error);
});
mongoose.connection.on('disconnected', () => {
    console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도 합니다.');
    connect();
})

module.exports = connect;