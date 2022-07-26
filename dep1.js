//순환참조
const dep2 = require('./dep2');
console.log('require dep2' , dep2);

module.exports = () => {
    console.log('dep2', dep2);
};