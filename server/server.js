const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const User = require('./model/user');  // Ensure correct path
const Message = require('./model/Message');  // Ensure correct path

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// MongoDB connection string
const dbUri = 'mongodb+srv://syedkazmi3:7SWW7r9XW0TTHKBG@chatapp.amvy7.mongodb.net/ChatDatabase?retryWrites=true&w=majority';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Store connected users
const connectedUsers = {};

// Serve static files from Angular app
app.use(express.static(path.join(__dirname, 'dist/chatapp')));

// Socket.IO setup for handling user connections and messages
io.on('connection', (socket) => {
  console.log('User connected: ', socket.id);

  // Handle user login and store them in `connectedUsers`
  socket.on('userLogin', (userId) => {
    connectedUsers[userId] = socket.id;
    console.log(`User ${userId} is online with socket ID: ${socket.id}`);
  });

  // Listen for new messages
  socket.on('sendMessage', async (data) => {
    const { sender, recipient, messageContent } = data;

    // Store message in the database
    const newMessage = new Message({
      content: messageContent,
      sender: sender,
      recipient: recipient,
      createdAt: new Date()
    });
    await newMessage.save();

    // Find recipient's socket ID
    const recipientSocketId = connectedUsers[recipient];
    if (recipientSocketId) {
      // Send message to the recipient
      io.to(recipientSocketId).emit('receiveMessage', { sender, messageContent });
    }
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.id);
    for (const userId in connectedUsers) {
      if (connectedUsers[userId] === socket.id) {
        delete connectedUsers[userId];
        break;
      }
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
