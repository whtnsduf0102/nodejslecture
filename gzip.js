//파일을 압축한 후 복사하는 예제
//압축에는 zlib 내장 모듈사용(createGzip로 .gz파일 생성)

const zlib = require('zlib');
const fs = require('fs');

const readStream = fs.createReadStream('./readme4.txt');
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./readme4.txt.gz');
readStream.pipe(zlibStream).pipe(writeStream);