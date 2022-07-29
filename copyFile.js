//파일복사하는 방법

const fs = require('fs').promises;

// fs.copyFile('복사할 파일', '복사될 경로', 콜백 함수)
fs.copyFile('readme4.txt', writeme4.txt)
    .then(() => {
        console.log('복사완료');
    })
    .catch((error) => {
        console.error(error);
    });