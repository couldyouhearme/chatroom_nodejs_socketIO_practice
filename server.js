const io = require("socket.io")(3000, {
    cors: {
        origin: 'http://127.0.0.1:5500'
    }
})

io.on('connection', socket => {
    console.log('new user')
    socket.emit('chat-message', 'Hello World!')
})