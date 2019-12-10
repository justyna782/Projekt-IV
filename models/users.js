const Joi = require('joi');
const mongoose = require('mongoose');

const User = new mongoose.model('User', new mongoose.Schema({
    user_id: {
        type: Number,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    user_password: {
        type: String,
        required: true,
        minlength: 6
        // jedna cyfra, jeden znak specjalny
    },
    user_email: {
        type: String,
        required: true,
        unique: true
        // poprawnosc adresu => @ 
    }
}));

function validateUser(user) {
    const schema = {
        user_password: Joi.string().min(6).required(),
        user_email: Joi.string().min(5).required().email()
    };
  
    return Joi.validate(user, schema);
  }

exports.User=User;
exports.validate = validateUser;
