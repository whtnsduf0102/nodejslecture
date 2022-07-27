const url = require('url');

const { URL } = url;
const myURL = new URL('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');

console.log('new URL():'    , myURL);
console.log('url.format():' , url.format(myURL));
console.log('---------------------------------------------------------');

const parsedUrl = url.parse('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');

console.log('url.parse():'  , parsedUrl);
console.log('url.format():' , url.format(parsedUrl));

/*
 * url 모듈안에 URL생성자가 있음.
 * 이 생성자에 주소를 넣어 객체로 만들면 주소가 부분별로 정리됨
 * 이 방식이 WHATWG의 url
 * WHATWH에만 있는 username, password, origin, searchParams 속성이 존재함
*/