const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:4200',  // Adjust this if needed
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection (without deprecated options)
const mongoUri = 'mongodb+srv://syedkazmi3:7SWW7r9XW0TTHKBG@chatapp.amvy7.mongodb.net/ChatData?retryWrites=true&w=majority';
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Mongoose User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Routes for Registration and Login
app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const newUser = new User({ username, password, email });
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send('Error registering user');
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) return res.status(400).send('Invalid credentials');
    res.status(200).json({ username: user.username });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Error logging in');
  }
});

// 1️⃣ **Get Users Route (Excluding Current User)**
app.get('/users', async (req, res) => {
  const { username } = req.query; // Current logged-in user's username
  
  try {
    // Find all users except the current one
    const users = await User.find({ username: { $ne: username } });
    if (!users || users.length === 0) {
      return res.status(404).send('No users found');
    }

    // Return just the usernames of other users
    const filteredUsers = users.map(user => ({ username: user.username }));
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users');
  }
});

// WebSocket connections
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('login', (username) => {
    socket.username = username;
    console.log(`${username} logged in`);
  });

  socket.on('sendMessage', (message) => {
    const { sender, recipient, messageContent } = message;
    const recipientSocket = Array.from(io.sockets.sockets.values()).find(s => s.username === recipient);
    if (recipientSocket) {
      recipientSocket.emit('receiveMessage', { sender, messageContent });
    } else {
      console.log(`Recipient ${recipient} not found or not online`);
    }
  });

  socket.on('disconnect', () => {
    console.log(`${socket.username} disconnected`);
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server running on port 3000');
});
