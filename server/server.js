const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const multer = require('multer'); // for file uploads
const path = require('path');

// Initialize Express and Socket.io
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (for serving images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// MongoDB connection
mongoose.connect('mongodb+srv://syedkazmi3:7SWW7r9XW0TTHKBG@chatapp.amvy7.mongodb.net/Chatapp?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Atlas connected!'))
  .catch(err => console.error(err));

// Mongoose Models for Users, Groups, Channels, Messages
const Message = mongoose.model('Message', new mongoose.Schema({
  sender: String,
  content: String,
  channel: String,
  imageUrl: String,
  timestamp: { type: Date, default: Date.now }
}));

// Socket.io events
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinChannel', (channelId) => {
    socket.join(channelId);
    socket.to(channelId).emit('userJoined', socket.id);
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

// Handle image uploads
app.post('/api/upload-image', upload.single('image'), (req, res) => {
  const imagePath = `/uploads/${req.file.filename}`;
  res.json({ imageUrl: imagePath });
});

// Start the server
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
