import { readTasks } from './taskRequests.js';

const loginForm = document.getElementById('login-form');

// get tasks from database after user logging 
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // decode JSON Web Token

    readTasks();
})