const socket = io('http://localhost:3000')

const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const userName = prompt('What is your name?')
appendMesage('You joined')
socket.emit('new-user', userName)

socket.on('user-connected', userName => {
    appendMesage(`${userName} connected!`)
})

socket.on('user-disconnected', userName => {
    appendMesage(`${userName} disconnected!`)
})

socket.on('chat-message', data => {
    appendMesage(`${data.userName}:${data.message}`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMesage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMesage(msg) {
    const msgElem = document.createElement('div')
    msgElem.innerText = msg
    messageContainer.append(msgElem)
}