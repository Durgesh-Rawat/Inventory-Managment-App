require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/InventoryApp").then(console.log("mongoDB connected"));

const schema = new mongoose.Schema({
    name: String,
    Quantity: Number,
    price: Number,
    category: String,
    status: String,
});

const model = new mongoose.model("model",schema);

app.get('/product', async(req,res) =>{
   const userItem = await model.find();
   res.json(userItem);
});

app.post('/product', async(req,res) =>{
    try{
    const {name,Quantity,price,category,status} = req.body;
    const newProduct = new model({
        name,
        Quantity,
        price,
        category,
        status
    }); 
   const savedProduct = await newProduct.save();
   res.status(201).json(savedProduct);
} catch(error){
    res.status(500).json({error: error.message});
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

app.use('/auth',require('./auth'));



const verifyToken = (req, res, next) => {
  const auth = req.headers['authorization'];
  if (!auth) return res.status(401).json({ error: 'No token' });

  const token = auth.split(' ')[1];
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

app.use('/product', verifyToken);


const PORT = process.env.PORT || 5002;

mongoose.connect(process.env.MONGO_URI)  // use .env

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


app.listen(5002, console.log("Server running on port 5002"));