const {User,validate} = require('../models/users')
const mongoose = require('mongoose');
const express=require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.find().sort('user_name');
    res.send(users);
  });

router.post('/', async(req, res)=>{
    const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
    let user = new User({
        user_id: user.length+1,
        user_name: req.body.user_name,
        user_password: req.body.user_password,
        user_email: req.body.user_email,
    });

    user = await user.save();    
    
    res.send(user);
});


  module.exports = router;