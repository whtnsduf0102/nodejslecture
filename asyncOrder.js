// 콜백형식 유지
// 코드가 우측으로 너무 들어가는 현상 발생 (콜백 헬)
// test!

const fs = require('fs');

console.log('시작');
fs.readFile('./readme2.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log('1번', data.toString());
    fs.readFile('./readme2.txt', (err, data) => {
        if(err){
            throw err;
        }
        console.log('2번', data.toString());
        fs.readFile('./readme2.txt', (err, data) => {
            if(err){
                throw err;
            }
            console.log('3번', data.toString());
            console.log('끝');
        });
    });
});