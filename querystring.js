const url = require('url');
const querystring = require('querystring');

const parsedUrl = url.parse('http://www.gilbut.com.kr/?page=3&limit=10&category=nodejs&category=javascript');
const query = querystring.parse(parsedUrl.query);

console.log('querystring.parse():'     , query);
console.log('querystring.stringify():' , querystring.stringify(query));

/*
 **querystring : 기존 노드 방식에서는 url querystring을 querystring 모듈로 처리
 * querystring.parse(쿼리): url의 query 부분을 자바스크립트 객체로 분해해줍니다.
 * querystring.stringify(객체): 분해된 query 객체를 문자열로 다시 조립해줍니다.
 */