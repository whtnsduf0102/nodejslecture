const User = require('../models/user');

exports. addFollowing =async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } }); //나의 아이디 객체를 참음
        if (user) {
            await user.addFollowings([parseInt(req.params.id, 10)]); //setFollowings 수정 할때 (기존 팔로워들 다 삭제됨 조심해야됨.) removeFollowings
            res.send('success');
        } else {
            res.status(404).send('no user');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}