const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') =>
    cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
        acc[k.trim()] = decodeURIComponent(v);
        return acc;
    }, {}); //req.headers.cookie 문자열을 객체로 바꿔주는 함수

http.createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie); // { mycookie: 'test' }
    if (req.url.startsWith('/login')) {  // 주소가 /login으로 시작하는 경우
        const { query } = url.parse(req.url);
        const { name } = qs.parse(query);
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);// 쿠키 유효 시간을 현재시간 + 5분으로 설정
        res.writeHead(302, { //redirect
            Location: '/',
            'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`, 
        }); //HttpOnly: 자바스크립트로 접근하지못하도록, Path=/ : / 아래에 있는 것들은 쿠키가 다 유효하다.
        res.end();
    } else if (cookies.name) {  // name이라는 쿠키가 있는 경우
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`${cookies.name}님 안녕하세요`);
    } else { //쿠키가 없을때
        try {
            const data = await fs.readFile('./cookie2.html');
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(err.message);
        }
    }
})
    .listen(8084, () => {
        console.log('8084번 포트에서 서버 대기 중입니다!');
    });