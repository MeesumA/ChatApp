const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Replace with your MongoDB Atlas connection string
mongoose.connect('mongodb+srv://syedkazmi3:7SWW7r9XW0TTHKBG@chatapp.amvy7.mongodb.net/Chatapp?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Atlas connected!'))
  .catch(err => console.log(err));


io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinChannel', (channelId) => {
    socket.join(channelId);
    socket.to(channelId).emit('userJoined', socket.id); // Notify other users in the channel
  });

  socket.on('sendMessage', async (data) => {
    const { senderId, content, channelId, imageUrl } = data;
    const newMessage = new Message({
      sender: senderId,
      content,
      channel: channelId,
      imageUrl
    });
    await newMessage.save();

    io.to(channelId).emit('receiveMessage', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
