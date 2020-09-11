const socketio = require('socket.io');
const {app, server} = require('./server');

const io = socketio(server);

io.on('connection', (socket) => {

    socket.emit('message', 'Confirmation: You have connected!');

        //TODO - Add new user to message
    socket.broadcast.emit('message', 'Talk $h!t with the competition. {user} has joined the fray!');

    socket.on('chatMsg', (msg) => {
        io.emit('message', msg)
    })

    socket.on('disconnect', () => {
        //TODO Add username to message
        io.emit('message', '{user} has left the scuffle.')
    })
})

module.exports = {app, server};