const os = require('os');  //내장 모듈이라 경로 대신 이름만 적어줘도 됨

console.log('운영체제 정보-----------------------------------------------------');
console.log('os.arch():'       , os.arch());         //process.arch와 동일
console.log('os.platform():'   , os.platform());     //process.platform과 동일
console.log('os.type():'       , os.type());         //운영체제의 종류
console.log('os.uptime():'     , os.uptime());       //운영체제 부팅 이후 흐른 시간
console.log('os.hostname():'   , os.hostname());     //컴퓨터의 이름
console.log('os.release():'    , os.release());      //운영체제의 버전

console.log('경로-------------------------------------------------------------');
console.log('os.homedir():'    , os.homedir());      //홈 디렉터리 경로
console.log('os.tmpdir():'     , os.tmpdir());       //임시 파일 저장 경로

console.log('CPU정보----------------------------------------------------------');
console.log('os.cpus():'       , os.cpus());         //컴퓨터의 코어 정보
console.log('os.cpus().length:', os.cpus().length);  //컴퓨터의 코어 갯수

console.log('메모리정보-------------------------------------------------------');
console.log('os.freemem():'    , os.freemem());      //사용 가능한 메모리(RAM)
console.log('os.totalmem():'   , os.totalmem());     //전체 메모리 용량
