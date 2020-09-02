const {app, server} = require('./server');
const socketio = require('socket.io');

const io = socketio(server);

io.on('connection', (socket) => {
    console.log('new socket connection');
})

module.exports = {app, server};