const socket = io();

const message = document.getElementById('message'),
    handle = 'B',
    output = document.getElementById('output'),
    typing = document.getElementById('typing'),
    button = document.getElementById('button');

message.addEventListener('keypress', () => {
    socket.emit('userTyping', handle.value);
});

button.addEventListener('click', () => {
    socket.emit('userMessage', {
        handle: handle.value,
        message: message.value
    });
    typing.innerHTML = '';
    message.value = '';
    var sizes = 0;
    output.scrollTop = output.scrollHeight;
});

message.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        button.click();
    }
});

socket.on('userMessage', (data) => {
    var html = '';
    html += '<div class="message">';
    html += '<div class="bubble">';
    html += data.message;
    html += '</div>';
    html += '<div class="time">1 min ago</div>';
    html += '</div>';
    output.innerHTML += html;
    html = '';
});

socket.on('userInfo', (data) => {
    console.log(data);
});

socket.on('userTyping', (data) => {
    if (data) {
        typing.innerHTML = '<p><em>' + data + ' is typing...</em></p>';
    } else {
        typing.innerHTML = '';
    }
});