const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
  passport.use(new LocalStrategy({  //auth.js 1번 실행됨
    usernameField: 'email', //req.body.email
    passwordField: 'password', //req.body.password
  }, async (email, password, done) => {
    try {
      const exUser = await User.findOne({ where: { email } }); //이메일이 있는 지 확인
      if (exUser) {
        const result = await bcrypt.compare(password, exUser.password); //비밀번호 비교
        if (result) {
          done(null, exUser); //비밀번호 일치 , done 함수 호출시 -> 2번으로 
        } else { // 비밀번호 불일치
          done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        }
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};