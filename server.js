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
  //to join a room after connection
  socket.on("join_request", (value, callback) => {
    socket.join(value);
    callback();
  })
  socket.on('sendMessage', (message, room, callback) => {
    //broadcast to others users
    socket.to(room).emit('receiveMessage', {...message, name:socket.id, userId:socket.id });
    //private message to sender
    io.to(socket.id).emit('receiveMessage', {...message, name:'Me', userId:socket.id});
    callback();
  });
  socket.on("disconnect", (reason) => {
    console.log("the user", socket.id, "is disconnecting for", reason);
  })
});


server.listen(PORT, () => {
  console.log(`server running at PORT ${PORT}`);
});