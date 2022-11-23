const SocketIO = require('socket.io');

module.exports = (server, app) => {
    const io = SocketIO(server, { path: '/socket.io' });
    app.set('io', io);
    io.on('connection', (socket) => { // 웹 소켓 연결 시
        const req = socket.request;
        const { headers: { referer } } = req;
        const roomId = referer.split('/')[referer.split('/').length - 1]; //roomId는 주소에서 추출, Good 테이블의 로우 id 가 됨
        socket.join(roomId); //방에 참가
        socket.on('disconnect', () => { //연결끊겼을 때
            socket.leave(roomId); //방에서 나감
        });
    });
};