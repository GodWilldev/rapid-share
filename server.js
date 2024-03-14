const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const PORT = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});


io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  socket.onAny((eventName, ...args) => {
    console.log("---", eventName, "fired with arguments", args, "by user", socket.id);
  });
  socket.on('sendMessage', (value) => {
    //broadcast to others users
    socket.broadcast.emit('receiveMessage', {...value, name:socket.id, userId:socket.id });
    // console.log("---", 'receiveMessage', "broadcast", "by server")
    //private message to sender
    io.to(socket.id).emit('receiveMessage', {...value, name:'Me', userId:socket.id});
  });
  socket.on("disconnect", (reason) => {
    console.log("the user", socket.id, "is disconnecting for", reason);
  })
});


server.listen(PORT, () => {
  console.log(`server running at PORT ${PORT}`);
});