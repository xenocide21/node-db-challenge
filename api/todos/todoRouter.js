
const todoRouter = require('./todoModel');
const router = require('express').Router();

router.get('/', (req, res) => {
    todoRouter.findTodos()
        .then( r => {
            res.status(200).json({ message: `status 200: fetched todos`, resource: r })
        })
        .catch( err => {
            res.status(500).json({ message: `status 500: internal server error, could not fetch todos` })
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    todoRouter.findTodoById(id)
        .then( r => {
            res.status(200).json({ message: `status 200: fetched todo`, resource: r })
        })
        .catch( err => {
            res.status(500).json({ message: `status 500: internal server error, could not fetch todo` })
        })
})

router.post('/', (req, res) => {
    todoRouter.addTodo(req.body)
        .then( r => {
            res.status(201).json({ message: `status 201: added todo`, resource: r })
        })
        .catch( err => {
            res.status(500).json({ message: `status 500: internal server error, could not add todo` })
        })
})

router.use((req, res) => {
    res.status(404).json({ message: `status 404: resource not found in todos` })
})

module.exports = router;