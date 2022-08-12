const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = () => {
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: '/auth/kakao/callback',
  }, async (accessToken, refreshToken, profile, done) => { //OAUTH2 공부(accessToken, refreshToken)
    console.log('kakao profile', profile);
    try {
      const exUser = await User.findOne({  //카카오로 가입한사람 이 있는지
        where: { snsId: profile.id, provider: 'kakao' },
      });
      if (exUser) { //가입한 사람있으면  성공
        done(null, exUser);
      } else { //없으면 가입시키기
        const newUser = await User.create({
          email: profile._json && profile._json.kakao_account_email,
          nick: profile.displayName,
          snsId: profile.id,
          provider: 'kakao',
        });
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};