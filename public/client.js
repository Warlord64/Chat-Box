

const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
var cut = document.querySelector('#cut')
var open = document.querySelector('#open')
var nav = document.querySelector('.nav')
var submit = document.querySelector('#submit')

while (!name) {
    name = prompt('Please enter your name: ');
} 


textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

submit.addEventListener('click', () => {
    sendMessage(textarea.value);
})



function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()//to remove white space
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server via websocket connection
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Event listener for receiving old messages
socket.on('oldMessages', (oldMessages) => {
    oldMessages.forEach((msg) => {
        appendMessage(msg, 'incoming');
    });
});

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}

function buttonCut(){
    nav.style.left = "-50%"
}
function buttonOpen(){
    nav.style.left = "0%"
}


