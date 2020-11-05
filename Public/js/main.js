const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const messageRow = document.querySelector(".message-row");
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get Username and Room name from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();


// Join Chat Room
socket.emit('joinRoom', { username, room });

// Get Users and Room info
socket.on('roomUsers', ({ room, users}) => {
    outputRoomName(room);
    outputUsers(users);
})

// Message from Server
socket.on('message', message => {
    console.log(message);
    console.log(socket.id);
    outputMessage(message, socket.id);
    const id = socket.id;

    // Scroll Down after getting Message
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message Submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get Message Text
    const msg = e.target.elements.msg.value;

    // Emit Message to Server
    socket.emit('chatMessage', msg);

    // Clear Input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})


function outputMessage(message, id) {
    const div = document.createElement('div');
    div.classList.add('you-message');
    
    div.innerHTML = ` <div class="message-title"><span>${message.username}</span></div>
    <div class="message-text">${message.text}</div>
    <div class="message-time"><span>${message.time}</span></div>`;
    document.querySelector('.message-row').appendChild(div);
}


// Add Room Name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
}

// Add Users to DOM
function outputUsers(users) {
    userList.innerHTML = `
        ${users.map(user => `<li><i class="fas fa-user-circle"></i> ${user.username}</li>`).join('')}    
    `;
}