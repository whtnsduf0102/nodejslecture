const spawn = require('child_process').spawn;

var process = spawn('python', ['test.py']);

process.stdout.on('data', function(data) {
    console.log(data.toString());
});//실행 결과
process.stderr.on('data', function(data) {
    console.error(data.toString());
});//실행 에러

/*  기타모듈
 * assert: 값을 비교하여 프로그램이 제대로 동작하는지 테스트하는 데 사용합니다.
 * dns: 도메인 이름에 대한 IP 주소를 얻어내는 데 사용합니다.
 * net: HTTP보다 로우 레벨인 TCP나 IPC 통신을 할 때 사용합니다.
 * string_decoder: 버퍼 데이터를 문자열로 바꾸는 데 사용합니다.
 * tls: TLS와 SSL에 관련된 작업을 할 때 사용합니다.
 * tty: 터미널과 관련된 작업을 할 때 사용합니다.
 * dgram: UDP와 관련된 작업을 할 때 사용합니다.
 * v8: V8 엔진에 직접 접근할 때 사용합니다.
 * vm: 가상 머신에 직접 접근할 때 사용합니다.
 */