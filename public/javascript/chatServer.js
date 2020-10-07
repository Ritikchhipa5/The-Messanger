const socket = io();
const form = document.getElementById('message-form');
const messageInput = document.getElementById("message-input");
const Container = document.querySelector('.message-container');
//Append Recive Msg 
const append = (message, position) => {
    const messag_element = document.createElement('div');
    messag_element.innerText = message;
    messag_element.classList.add('message-box');
    messag_element.classList.add(position);
    if (position === 'float-left') {
        messag_element.style.borderBottomLeftRadius = '0px';
        messag_element.style.backgroundColor = '#eee';
        messag_element.style.color = 'black';
    } else {
        messag_element.style.borderBottomRightRadius = '0px';
    }
    Container.append(messag_element);
}

socket.on("message", message => {
    console.log(message);
});

const name = prompt("enter yout name ");
socket.emit("new-user-joined", name);

socket.emit('join', name);


socket.emit("user-want-to-caht-with-you",)
//user has joined chat
socket.on('user-joined', (name) => {
    alert(`${name} has joined chat`);
});


socket.on("new_msg", data => {
    alert(data.msg);
}
);

//When form submit
form.addEventListener('submit', (e) => {
    e.preventDefault()
    var msg = messageInput.value;
    append(`You: ${msg}`, "float-right");
    socket.emit('send', msg);
    messageInput.value = "";
});

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, "float-left");
});
