const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _=require('lodash');
const {User,validate} = require('../models/users');
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
  
let user = await User.findOne({user_email: req.body.user_email});
if (user) return res.status(400).send('User already registered.');

        user = new User(_.pick(req.body,['user_name','user_password','user_email']));

    const salt = await bcrypt.genSalt(10);
    user.user_password = await bcrypt.hash(user.user_password, salt);
    await user.save();    
    
    const token = jwt.sign({_id: user.user_id},config.get('jwtPrivateKey'));
    res.header('x-auth-token',token).send( _.pick(user, ['_id','user_name','user_email']));
});


  module.exports = router;