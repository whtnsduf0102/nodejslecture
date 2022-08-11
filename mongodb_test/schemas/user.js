const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
    name: { //underscoreId 생략
        type: String,
        required: true, //필수값
        unique: true,   //고유성
    },
    age: {
        type: Number,
        required: true,
    },
    married: {
        type: Boolean,
        required: true,
    },
    comment: String,    //옵션이 type 만 있는경우 이와 같이 작성 가능
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', userSchema);