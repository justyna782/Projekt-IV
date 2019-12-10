const config = require('config');
const mongoose = require('mongoose');
const tasks = require('./routes/tasks');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

const uri = "mongodb+srv://new-user:4fXQNt348Y1zMaNi@cluster0-xmb3c.mongodb.net/test?retryWrites=true&w=majority";

//mongoose.connect('mongodb://localhost/tasks_database')
mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

app.use(express.json());
app.use('/api/tasks', tasks);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.get('/', (req, res) => {
    res.send('Hello World')
})
app.listen(3000, () => console.log("Listening on port 3000...."))