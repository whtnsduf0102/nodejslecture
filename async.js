const fs = require('fs');

console.log('시작');
fs.readFile('./readme2.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log('1번', data.toString());
});
fs.readFile('./readme2.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log('2번', data.toString());
});
fs.readFile('./readme2.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log('3번', data.toString());
});
fs.readFile('./readme2.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log('4번', data.toString());
});
fs.readFile('./readme2.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log('5번', data.toString());
});
fs.readFile('./readme2.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log('6번', data.toString());
});
fs.readFile('./readme2.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log('7번', data.toString());
});
fs.readFile('./readme2.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log('8번', data.toString());
});

console.log('끝');