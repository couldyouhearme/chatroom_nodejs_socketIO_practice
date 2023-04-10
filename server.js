const io = require("socket.io")(3000, {
    cors: {
        origin: 'http://127.0.0.1:5500'
    }
})

const users = {}

io.on('connection', socket => {
    //socket.emit('chat-message', 'Hello World!')
    socket.on('new-user', userName => {
        users[socket.id] = userName
        socket.broadcast.emit('user-connected', userName)
    })

    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', {
            message: message,
            userName: users[socket.id]
        })
    })

    socket.on('disconnected', () => {
        socket.broadcast.emit('user-disconnected', users[socket.io])
        delete users[socket.io]
        console.log('users:', users)
    })

})