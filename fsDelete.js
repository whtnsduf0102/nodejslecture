const fs = require('fs').promises;

// fs.readdir(경로, 콜백) : 폴더 안의 내용물을 확인. 배열 안에 내부 파일과 폴더명이 나온다.
fs.readdir('./folder')
    .then((dir) => {
        console.log('폴더 내용 확인', dir);
        // 폴더 내용 확인 [ 'newfile.js' ]

        // fs.unlink(경로, 콜백): 파일을 삭제한다. 파일이 없다면 에러가 발생하므로 파일이 있는지 꼭 확인해야한다.
        return fs.unlink('./folder/newFile.js');
    })
    .then(() => {
        console.log('파일 삭제 성공')
        // fs.rmdir(경로, 콜백) : 폴더를 삭제한다. 폴더 안에 파일들이 있다면 에러가 발생하므로 먼저 내부 파일을 모두 지우고 호출해야한다.
        return fs.rmdir('./folder');
    })
    .then(() => {
        console.log('폴더 삭제 성공');
    })
    .catch((err) => {
        console.error(err);
    });