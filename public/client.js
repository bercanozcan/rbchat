const recordAudio = () =>
    new Promise(async resolve => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];
        mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
        });

        const start = () => mediaRecorder.start();

        const stop = () =>
            new Promise(resolve => {
                mediaRecorder.addEventListener("stop", () => {
                    const audioBlob = new Blob(audioChunks, { 'type': 'audio/ogg; codecs=opus' });
                    var reader = new FileReader();
                    reader.readAsDataURL(audioBlob);
                    reader.onloadend = function () {
                        console.log(reader.result);
                        socket.emit('createMessage', {
                            handle: 'B',
                            message: reader.result,
                            createAt: new Date().getTime()
                        });
                    }
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audio = new Audio(audioUrl);
                    const play = () => audio.play();
                    resolve({ audioBlob, audioUrl, play });
                });

                mediaRecorder.stop();
            });

        resolve({ start, stop });
    });

const sleep = time => new Promise(resolve => setTimeout(resolve, time));


const socket = io();

const message = document.getElementById('message'),
    output = document.getElementById('output'),
    button = document.getElementById('button');

const handleAction = async () => {
    const recorder = await recordAudio();
    const actionButton = document.getElementById('action');
    actionButton.disabled = true;
    actionButton.style.backgroundColor = "red";
    recorder.start();
    await sleep(60000);
    const audio = await recorder.stop();
    actionButton.style.backgroundColor = "#166cbf";
    typing.innerHTML = '';
    message.value = '';
    actionButton.disabled = false;
}

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
    html += '<div class="message me">';
    html += '<div class="bubble">';
    html += '<audio controls src="' + data.message + '"></audio>';
    html += '</div>';
    html += '<div class="time">' + formattedTime + '</div>';
    html += '</div>';

    output.innerHTML += html;
    html = '';
});

