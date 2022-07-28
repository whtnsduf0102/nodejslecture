//child_process : 노드에서 다른 프로그램을 실행하고 싶거나 명령어를 수행하고 싶을 때 사용

const exec = require('child_process').exec;

var process = exec('dir'); //명령 프롬프트의 명령어인 dir을 노드를 통해 실행 (리눅스라면 ls를 대신 적을것)

process.stdout.on('data', function(data) {
    console.log(data.toString());
}); //실행 결과

process.stderr.on('data', function(data) {
    console.error(data.toString());
})//실행 에러