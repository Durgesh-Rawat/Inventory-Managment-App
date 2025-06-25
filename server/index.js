require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // ✅ import this
const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB using environment variable
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// ✅ Define schema & model
const schema = new mongoose.Schema({
  name: String,
  Quantity: Number,
  price: Number,
  category: String,
  status: String,
});

const model = mongoose.model("model", schema);

// ✅ Middleware to protect routes
const verifyToken = (req, res, next) => {
  const auth = req.headers['authorization'];
  if (!auth) return res.status(401).json({ error: 'No token provided' });

  const token = auth.split(' ')[1];
  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// ✅ Public route for auth
app.use('/auth', require('./auth'));

// ✅ Protected routes
app.use('/product', verifyToken);

// GET all products
app.get('/product', async (req, res) => {
  const userItem = await model.find();
  res.json(userItem);
});

// POST new product
app.post('/product', async (req, res) => {
  try {
    const { name, Quantity, price, category, status } = req.body;
    const newProduct = new model({ name, Quantity, price, category, status });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a product
app.delete('/product/:id', async (req, res) => {
  try {
    await model.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE a product
app.put('/product/:id', async (req, res) => {
  try {
    const updated = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
