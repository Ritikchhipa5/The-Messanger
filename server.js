const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const user = {};
//PORT of server
const PORT = 4000 || process.env.PORT;

// Set Static Folder?
app.use(express.static(path.join(__dirname, 'react/public')));
// Run When Client connected
io.on('connection', (socket) => {
    socket.emit('message', "Welcome to chat box");

    // When new User is joined 
    socket.on('new-user-joined', (name) => {
        user[socket.id] = name;
        console.log(`User:${name}`);
        console.log(socket.id);
        socket.broadcast.emit('user-joined', user[socket.id]);
    });

    //For Private message
    socket.on('join', (data) => {
        socket.join(data);
    });
    socket.on('disconnect', () => {
        console.log(`User: ${user[socket.id]} has been disconnected\n`);
    });

    socket.on('send', (message) => {
        socket.broadcast.emit('receive', { message: message, name: user[socket.id] });
    });


    io.sockets.in('Ritik').emit('new_msg', { msg: 'hello' });
});



//Listen Port
http.listen(80,'0.0.0.0', () => {
    console.log(`server running on :${PORT}`);
})