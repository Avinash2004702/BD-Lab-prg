const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
// Array to store tasks
let tasks = [];
// Home Route
app.get('/', (req, res) => {
    res.send('Task Manager API Running...');
});
// GET All Tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// POST New Task
app.post('/tasks', (req, res) => {

    const { title, status } = req.body;

    if (!title || !status) {
        return res.status(400).json({
            message: "Title and Status are required"
        });
    }

    const newTask = {
        id: tasks.length + 1,
        title,
        status
    };

    tasks.push(newTask);

    res.status(201).json({
        message: "Task Added Successfully",
        task: newTask
    });

});

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
});
