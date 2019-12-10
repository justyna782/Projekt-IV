const mongoose = require('mongoose');
const tasks = require('./routes/tasks');
const users = require('./routes/users');
const express=require('express');
const app=express();

mongoose.connect('mongodb://localhost/tasks_database')
.then(()=> console.log('Connected to MongoDB...'))
.catch(err=> console.error('Could not connect to MongoDB...',err)) 

app.use(express.json());
app.use('/api/tasks', tasks);
app.use('/api/users', users);
app.get('/',(req,res)=>{
    res.send('Hello World')
})
app.listen(3000,()=>console.log("Listening on port 3000...."))