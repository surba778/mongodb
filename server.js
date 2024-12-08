import express, { json } from 'express';
import mongoose from 'mongoose';

export default User;

import User from './models/User.js';  // include the '.js' extension

const app = express();

app.use(json()); // Middleware to parse JSON bodies

// Create a new user (POST)
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all users (GET)
app.get('/users', async (req, res) => {
  try {
    const users = await find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a user (PUT)
app.put('/users/:id', async (req, res) => {
  try {
    const user = await findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a user (DELETE)
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mynewdatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('MongoDB connection successful');
  }).catch((err) => {
    console.error('MongoDB connection error:', err);
  });
