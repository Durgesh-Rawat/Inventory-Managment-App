const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('./models/User');

const SECRET ='my_secret_key';

//signup Route

router.post('/signup', async(req,res) =>{
      const {email,password} = req.body;
      const exists = await User.findOne({ email });
      if(exists) return res.status(400).json({error : 'user already exists'});

      const hashed = await bcrypt.hash(password,10);
      const user = new User({ email, password: hashed});
      await user.save();
      res.status(201).json({ message: 'User Created'});
});

//Login Route

router.post('/login', async(req,res) =>{
   const {email, password} = req.body;
   const user = await User.findOne({ email });
   if(!user) return res.status(400).json({error: 'User not found'});

   const match = await bcrypt.compare(password, user.password);
   if(!match) return res.status(401).json({error: 'Invalid credential'});

   const token = jwt.sign({id: user._id}, SECRET , {expiresIn: '1h'});
   res.json({token});
});

module.exports = router;