const socketio = require('socket.io');
const {app, server} = require('./server');

const io = socketio(server);

io.on('connection', (socket) => {
    console.log('new socket connection', socket);
})

module.exports = {app, server};