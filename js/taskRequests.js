import { showTask } from './app.js';

function createTask(newTask) {
    const url = 'http://localhost:3000/api/tasks';
    const taskData = {
        task_done: newTask.done,
        task_name: newTask.name,
        task_end_date: newTask.endDate,
        task_description: newTask.description
    }
    fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData)
        })
        .then(res => res.json())
        .then(res => console.log('Task is created', res))
        .catch(err => console.log(err.message));
}

function readTasks() {
    const url = 'http://localhost:3000/api/tasks';
    fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(tasks => tasks.map(task => showTask(task)))
        .catch(err => console.log(err.message));
}

function updateTask(id, isDone) {
    const url = `http://localhost:3000/api/tasks/${id}`;
    const taskData = {
        task_done: isDone
    }
    fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        })
        .then(res => res.json())
        .then(res => console.log('Task is updated', res))
        .catch(err => console.log(err.message));
}

export { createTask, readTasks, updateTask }