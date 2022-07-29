// big.txt 파일을 스트림방식의 메모리사용량 체크

const fs = require('fs');

console.log('brfore:', process.memoryUsage().rss);

const readStream = fs.createReadStream('./big.txt');
const writeStream = fs.createWriteStream('./big3.txt');
readStream.pipe(writeStream);
readStream.on('end', () => {
    console.log('stream:', process.memoryUsage().rss);
});