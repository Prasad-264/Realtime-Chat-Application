const socket = io('http://localhost:8000');

const form = document.getElementById('send-message');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

// Audio that will play on receiving messages
// var audio = new audio();

// Function which will append to the container
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    // if(position == 'left') {
    //     audio.play();
    // }
}

// Name of a new user, who wants to join and 
// let the server know about it
const namee = prompt("Enter your name to join");
socket.emit('new-user-joined', namee);

// If new user joins, receive the event from the server
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right')
})

// If server send a message, receive it
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
})

// If a user leaves the chat, append the info to the container
socket.on('leave', name => {
    append(`${name} left the chat`, 'right')
})

// If the form gets submitted, send it to the server
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})