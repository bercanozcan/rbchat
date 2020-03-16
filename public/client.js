const socket = io();

const message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    output = document.getElementById('output'),
    button = document.getElementById('button');

    button.addEventListener('click', ()=>{
        socket.emit('userMessage', {
            handle: handle.value,
            message: message.value
        });
    });

    socket.on('userMessage', (data)=>{
        output.innerHTML += '<p><strong>'+data.handle+':</strong>' + data.message+ '</p>';
    });