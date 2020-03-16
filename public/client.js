const socket = io();

const message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    output = document.getElementById('output'),
    typing = document.getElementById('typing'),
    button = document.getElementById('button');

    message.addEventListener('keypress', ()=>{
        socket.emit('userTyping', handle.value);
    });

    button.addEventListener('click', ()=>{
        socket.emit('userMessage', {
            handle: handle.value,
            message: message.value
        });
        typing.innerHTML = '';
        message.value = '';
    });

    socket.on('userMessage', (data)=>{
        output.innerHTML += '<p><strong>'+data.handle+':</strong>' + data.message+ '</p>';
    });

    socket.on('userTyping', (data)=>{
        if (data) {
            typing.innerHTML = '<p><em>'+data+' is typing...</em></p>';
        } else {
            typing.innerHTML = '';
        }
    });