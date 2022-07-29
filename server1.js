const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'}); //html로 인식시키 위한 코드
    res.write('<h1>Hello Node</h1>');
    res.write('<p>Hello server</p>');
    res.end('<p>Hello SUN!!</p>');
})
    .listen(8080);

server.on('listening', () => {
    console.log('8080번 포트에서 서버대기중...')
});

server.on('error', (error) => {
    console.error(error);
});