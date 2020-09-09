const socketio = require('socket.io');
const {app, server} = require('./server');

const io = socketio(server);

io.on('connection', (socket) => {
    console.log('new socket connection', socket);

    io.emit('message', 'whats up my dudes')
})

module.exports = {app, server};