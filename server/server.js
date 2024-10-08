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
    origin: 'http://localhost:4200',  // Allowing Angular client
    methods: ['GET', 'POST'],
  },
});

app.use(cors());  // Enable CORS for frontend
app.use(bodyParser.json());  // Enable JSON body parsing

// Connect to MongoDB
const mongoUri = 'mongodb+srv://syedkazmi3:7SWW7r9XW0TTHKBG@chatapp.amvy7.mongodb.net/ChatData?retryWrites=true&w=majority';
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Mongoose schema and model for Users
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  roles: [String],
  groups: [String],
});
const User = mongoose.model('User', userSchema);

// 1️⃣ **User Registration**
app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }

    // Create new user
    const newUser = new User({ username, password, email });
    await newUser.save();

    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal server error');
  }
});

// 2️⃣ **User Login**
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the MongoDB collection
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(400).send('Invalid credentials');
    }

    res.status(200).send('Login successful');
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Internal server error');
  }
});

// 3️⃣ **Get Users (excluding current user)**
app.get('/users', async (req, res) => {
  const { username } = req.query; // The current user's username

  try {
    // Fetch all users from MongoDB except the current logged-in user
    const users = await User.find({ username: { $ne: username } });  // $ne means "not equal to"
    
    // Only return usernames (you could exclude other fields here as well)
    const filteredUsers = users.map(user => ({ username: user.username }));
    
    res.json(filteredUsers);  // Return the filtered list of users
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal server error');
  }
});

// Start the server
server.listen(3000, () => {
  console.log('Server running on port 3000');
});
