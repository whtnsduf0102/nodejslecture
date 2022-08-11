const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({   // 1번째 인수 컬럼정의
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      age: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      married: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,   // --> DATETIME , MYSQL: DATE --> Sequelize: DateOnly
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    }, {  //2번째 인수 모델에 대한 설정
      sequelize,
      timestamps: false,    // true 일때 createdAt, updatedAt 생성
      underscored: false,   // true = snake_case /  false = camelCase 
      modelName: 'User',
      tableName: 'users',   // 모델이름이 Bird 이면 테이블이름은 birds
      paranoid: false,      // true 이면 deletedAt 생성 됨 deletedAt: ture => soft delete 
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
  }
};