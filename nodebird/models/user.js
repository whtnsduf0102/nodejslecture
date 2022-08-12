const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model { //mysql의 테이블과 매칭이 됨
  static init(sequelize) { //static 으로 init 메서드를 만들어야 함.(공식문서)
    return super.init({ //super가 부모인 모델을 가리킴
      email: {
        type: Sequelize.STRING(40), 
        allowNull: true,  //비어있어도 됨 null
        unique: true,  //고유성
      },
      nick: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100), //100 글자인 이유는 hash 화 하기 위해
        allowNull: true, // kakao 같은 걸로 로그인 할 경우 비밀번호 없을 수 있음.
      },
      provider: { //로그인 제공자
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'local', //kakao, naver
      },
      snsId: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true, 
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.User, {
      foreignKey: 'followingId',
      as: 'Followers',
      through: 'Follow',
    });
    db.User.belongsToMany(db.User, {
      foreignKey: 'followerId',
      as: 'Followings',
      through: 'Follow',
    });
  }
};