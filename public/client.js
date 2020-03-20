const socket = io();

const message = document.getElementById('message'),
    output = document.getElementById('output'),
    button = document.getElementById('button');

button.addEventListener('click', () => {
    socket.emit('createMessage', {
        handle: 'B',
        message: message.value,
        createAt: new Date().getTime()
    });
    typing.innerHTML = '';
    message.value = '';
});

message.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        button.click();
    }
});

socket.on('createMessage', (data) => {
    const formattedTime = moment(data.createAt).format('LT');
    console.log(data);
    var html = '';
    html += '<div class="message">';
    html += '<div class="bubble">';
    html += data.message;
    html += '</div>';
    html += '<div class="time">'+formattedTime+'</div>';
    html += '</div>';

    output.innerHTML += html;
    html = '';
});


socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected to server');
});