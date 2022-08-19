const Sequelize = require('sequelize');

module.exports = class Domain extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      host: {//웹플렛폼에 등록한 도메인
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      type: {// 요금제 사용 할때 무료인지 유료회원인지
        type: Sequelize.ENUM('free', 'premium'),
        allowNull: false,
      },
      clientSecret: {//rest API 키 값
        type: Sequelize.STRING(36),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: 'Domain',
      tableName: 'domains',
    });
  }

  static associate(db) {
    db.Domain.belongsTo(db.User);
  }
};