
const tasksModel = require('./tasksModel');
const todoModel = require('../todos/todoModel');
const router = require('express').Router();

router.get('/', (req, res) => {
    console.log(tasksModel);
    tasksModel.findTasks()
        .then( r => {
            const sta = r.map(task => {
                task.completed = !!task.completed;
                return task;
            })
            res.status(200).json({ message: `status 200: fetched tasks`, resource: sta })
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({ message: `status 500: internal server error, could not fetch tasks` })
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    let contexts;

    todoModel.findContextsByTaskId(id)
        .then( resou => {
            contexts = resou;
        })
        .catch( err => {
            console.log(err);
        })

    tasksModel.findTaskById(id)
        .then( r => {
            r.completion = !!r.completion;
            r.contexts = contexts;

            res.status(200).json({ message: `status 200: fetched task`, resource: r })
        })
        .catch( err => {
            res.status(500).json({ message: `status 500: internal server error, could not fetch task` })
        })
})

router.post('/', (req, res) => {
    tasksModel.addTask(req.body)
        .then( r => {
            r.completion = !!r.completion;
            res.status(201).json({ message: `status 201: added task`, resource: r })
        })
        .catch( err => {
            res.status(500).json({ message: `status 500: internal server error, could not add task` })
        })
})

router.use((req, res) => {
    res.status(404).json({ message: `status 404: resource not found in tasks` })
})

module.exports = router;