const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');
const PORT = 3000;
var bodyParser = require('body-parser');
var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'sample',
    api_key: '874837483274837',
    api_secret: 'a676b67565c6767a6767d6767f676fe1'
});

app.use(bodyParser.json());
app.use(express.static('public'));


app.post('/post', (req, res) => {
    cloudinary.config({
        cloud_name: 'bercanozcan',
        api_key: '451127563152676',
        api_secret: '9fMdDRaC4RvQp-pIID4ziVp9YzY'
    });
    cloudinary.uploader.upload(req.body.voice, { resource_type: "auto", public_id: "voice", }, function (error, result) {
        console.log(result, error);
    });
    res.status(201).send(req.body.voice);
});

app.get('/', (req, res) => {
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

    res.sendFile(__dirname + '/index.html');

});

http.listen(PORT, () => {
    console.log("Listening port " + 3000);
});