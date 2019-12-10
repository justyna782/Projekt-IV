const Joi = require('joi');
const mongoose = require('mongoose');

const User = new mongoose.model('User', new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    user_password: {
        type: String,
        required: true,
        match: /^(?=.*\d)(?=.*\W)|(?=.*[_]).{6,100}$/
        // jedna cyfra, jeden znak specjalny
    },
    user_email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        // poprawnosc adresu e-mail
    }
}));

function validateUser(user) {
    const schema = {
        user_name: Joi.string().min(3).required(),
        user_password: Joi.string()
        .regex(/^(?=.*\d)(?=.*\W)|(?=.*[_]).{6,100}$/) // min 6 max 100, znak specjalny z możliwym '_' (logiczne OR po \w)
        .required(),
        user_email: Joi.string().min(5).required().email()
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
