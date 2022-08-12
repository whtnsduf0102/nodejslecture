const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');


const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {  //회원가입 라우터
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } }); //기존에 이메일로 가입한사람이 있는지 확인
    if (exUser) {
      return res.redirect('/join?error=exist'); //이메일이 있으면 에러 리턴
    }
    const hash = await bcrypt.hash(password, 12); //비밀번호를 bcrypt hash 화  숫자12 -> 높을수록 보안등급올라감. 
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

//로그인은 세션문제, 카카오로그인, 이메일로그인 할 때 다른 점 등 다양한 문제가 있음. 하여 passport 를 이용하여 깔금하게 작성
router.post('/login', isNotLoggedIn,(req, res, next) => { //미들웨어 확장하는 패턴
  passport.authenticate('local', (authError, user, info) => {  // (passport.authenticate('local', 여기까지 실행되면서) localStrategy 로 찾아감 1번 
    if (authError) { //서버에러가 있는경우                       // ((authError, user, info) => {) LocalStrategy2번  여기서부터 실행됨
      console.error(authError);
      return next(authError);
    }
    if (!user) { //로그인 실패한 경우
      return res.redirect(`/?loginError=${info.message}`); //로그인 에러 메시지 프론트로 보냄
    }
    return req.login(user, (loginError) => {  //로그인 성공시 ->req.login 하는 순간 passport의 index.js 1번 으로 감
      if (loginError) {                         // index.js 2번 : (loginError) => {  여기부터 실행됨
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/'); //로그인 성공
      //세션 쿠키를 브라우저로 보내줌
    });  // ((authError, user, info) => {) LocalStrategy2번  여기서까지 실행됨  //index.js 2번 : (loginError) => {  여기까지 실행됨
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/');
});

module.exports = router;