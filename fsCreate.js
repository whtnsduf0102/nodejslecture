const fs = require('fs').promises;
const constants = require('fs').constants;

fs.access( './folder', constants.F_OK | constants.W_OK | constants.R_OK )
    .then(() => {
        return Promise.reject('이미 폴더 있음');
    })
    .catch((err) => {
        if ( err.code === 'ENOENT' ) {
            console.log('폴더없음');
             // fs.mkidr('경로', 콜백) : 폴더를 만드는 메서드. 이미 폴더가 있다면 에러가 발생하므로 
             // 먼저 access 메서드를 호출해서 확인하는 것이 중요하다.
            return fs.mkdir('./folder');
        }
        return Promise.reject(err);
    })
    .then(() => {
        console.log('폴더 만들기 성공');
        // fs.open(경로, 온셥, 콜백): 파일의 아이디(fd 변수)를 가져오는 메서드. 
        // 파일이 없다면 파일을 생성한 뒤 그 아이디를 가져온다. 가져온 아이디를 사용해 읽거나(fs.read) 쓸 수(fs.write) 있다. 
        // 2번째 인수로 어떤 동작을 할 것인지 설정 가능. ('w' 쓰기 / 'r' 읽기 / 'a' 기존 파일에 추가)
        return fs.open('./folder/file.js', 'w');
    })
    .then((fd) => {
        console.log('빈 파일 만들기 성공', fd);
        // fs.rename(기존 경로, 새 경로, 콜백) : 파일의 이름을 바꾸는 메서드. 
        // 기존 파일 위치와 새로운 파일 위치를 저으면 된다. 꼭 같은 폴더를 저장할 필요는 없으므로 잘라내기와 같은 기능을 할 수 도 있다.
        fs.rename('./folder/file.js', './folder/newfile.js');
    })
    .then(() => {
        console.log('이름 바꾸기 성공');
    })
    .catch((err) => {
        console.error(err);
    });