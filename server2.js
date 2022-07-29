const http = require('http');
const fs = require('fs').promises;

const server = http.createServer( async(req, res) => {
    try{
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); //html로 인식시키 위한 코드
        const data = await fs.readFile('./server2.html');//html 파일을 읽어옴
        res.end(data);
    } catch(error) {
        console.error(err);
        res.writeHead(200, { 'Content-type': 'text/plain; charset=utf-8' } );
        res.end(err.message);
    }
})
    .listen(8080);

server.on('listening', () => {
    console.log('8080번 포트에서 서버대기중...')
});

server.on('error', (error) => {
    console.error(error);
}); 