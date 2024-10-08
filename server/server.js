const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Use your provided MongoDB connection string
const dbUri = 'mongodb+srv://syedkazmi3:7SWW7r9XW0TTHKBG@chatapp.amvy7.mongodb.net/ChatData?retryWrites=true&w=majority';

// Connect to MongoDB without deprecated options
mongoose.connect(dbUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, 'dist/chatapp')));

// Socket.io chat functionality
io.on('connection', (socket) => {
  console.log('User connected: ', socket.id);

  // Listen for new messages
  socket.on('newMessage', (data) => {
    io.emit('messageBroadcast', data); // Broadcast message to all clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
