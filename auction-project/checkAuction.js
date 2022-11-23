// const { scheduleJob } = require('node-schedule');
// const { Op } = require('Sequelize');

// const { Good, Auction, User, sequelize } = require('./models');

// module.exports = async () => {
//     console.log('checkAuction');
//     try {
//         const yesterday = new Date();
//         yesterday.setDate(yesterday.getDate() - 1); //어제시간
//         const targets = await Good.findAll({
//             where: {
//                 SoldId: null, //24시간이 지났는데 낙찰이 되지 않은 입찰자
//                 createdAt: { [Op.lte]: yesterday },
//             },
//         });
//         targets.forEach(async (target) => {
//             const success = await Auction.findOne({
//                 where: { GoodId: target.id },
//                 order: [['bid', 'DESC']],
//             });
//             await Good.update({ SoldId: success.UserId }, { where: { id: targets.id } });
//             await User.update({
//                 money: sequelize.literal(`money - ${success.bid}`),
//             }, {
//                 where: { id: success.UserId },
//             });
//         });
//         const unsold = await Good.findAll({
//             where: {
//                 SoldId: null,
//                 createdAt: { [Op.gt]: yesterday },
//             },
//         });
//         unsold.forEach((target) => {
//             const end = new Date(unsold.createdAt);
//             end.setDate(end.getDate() + 1);
//             scheduleJob.scheduleJob(end, async () => {
//                 const success = await Auction.findOne({
//                     where: { GoodId: target.id },
//                     order: [['bid', 'DESC']],
//                 });
//                 await Good.update({ SoldId: success.UserId }, { where: { id: targets.id } });
//                 await User.update({
//                     money: sequelize.literal(`money - ${success.bid}`),
//                 }, {
//                     where: { id: success.UserId },
//                 });
//             }); 
//         });
//     } catch (error) {
//         console.error(error);
//     }
// };

const { Op } = require('Sequelize');

const { Good, Auction, User, sequelize } = require('./models');

module.exports = async () => {
  console.log('checkAuction');
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // 어제 시간
    const targets = await Good.findAll({
      where: {
        SoldId: null,
        createdAt: { [Op.lte]: yesterday },
      },
    });
    targets.forEach(async (target) => {
      const success = await Auction.findOne({
        where: { GoodId: target.id },
        order: [['bid', 'DESC']],
      });
      await Good.update({ SoldId: success.UserId }, { where: { id: target.id } });
      await User.update({
        money: sequelize.literal(`money - ${success.bid}`),
      }, {
        where: { id: success.UserId },
      });
    });
  } catch (error) {
    console.error(error);
  }
};