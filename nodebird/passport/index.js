const passport = require('passport'); //로그인 어떻게 할지 적어놓은 파일(전략)
const local = require('./localStrategy'); //로컬로그인 어떻게 할지
const kakao = require('./kakaoStrategy'); //카카오로그인 어떻게 할지
const User = require('../models/user');
const { deleteOne } = require('../../mongodb_test/schemas/comment');

module.exports = () => { 
    passport.serializeUser((user, done) => { //req.login auth 1번  : serializeUser 실행됨
        done(null, user.id); //세션에 user의 id만 저장됨 , done실행되면 auth 2번
    });

    passport.deserializeUser((id, done) => { //user 전체 정보를 복구해줌
        User.findOne({ where: { id } })
            .then(user => done(null, user)) //req.user , req.isAuthenticated()
            .catch(err => done(err));
    });

    local();
    kakao();
}