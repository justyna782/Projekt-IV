const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const _=require('lodash');
const {User} = require('../models/users');
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
if (!user) return res.status(400).send('Invalid email or password.');

const validPassword = bcrypt.compare(req.body.password, user.user_password);
if(!validPassword) return res.status(400).send('Invalid password.');

const token = jwt.sign({_id: user._id},config.get('jwtPrivateKey'));
res.send(token);
});

function validate(req) {
    const schema = {
        user_password: Joi.string().min(6).required(),
        user_email: Joi.string().min(5).required().email()
    };
  
    return Joi.validate(user, schema);
  }

  module.exports = router;