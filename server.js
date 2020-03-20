const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

    console.log(`A new user connected ${socket.id}`);

    socket.on('createMessage', (data) => {
        io.sockets.emit('createMessage', data);
        io.emit('newMessage', {
            handle: data.handle,
            message: data.message,
            createAt: new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
        console.log(`User was disconnected`);
    });

});

http.listen(PORT, () => {
    console.log("Listening port " + 3000);
});