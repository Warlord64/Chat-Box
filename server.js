const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000
//cosnt chathistory

const chatHistory = [];

//const users
const users = {};

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {


    
    //old msg to new user
    socket.emit('oldMessages', chatHistory);

    //msg from client
    socket.on('message', (msg) => {
        console.log(msg);
        chatHistory.push(msg);
        socket.broadcast.emit('message', msg)
    })


})



