
const contextsModel = require('./contextModel');
const router = require('express').Router();

router.get('/', (req, res) => {
    contextsModel.findContexts()
        .then( r => {
            res.status(200).json({ message: `status 200: fetched borrows`, resource: r })
        })
        .catch( err => {
            res.status(500).json({ message: `status 500: internal server error, could not fetch contexts` })
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    contextsModel.findContextById(id)
        .then( r => {
            res.status(200).json({ message: `status 200: fetched context`, resource: r })
        })
        .catch( err => {
            res.status(500).json({ message: `status 500: internal server error, could not fetch context` })
        })
})

router.post('/', (req, res) => {
    contextsModel.addContext(req.body)
        .then( r => {
            res.status(201).json({ message: `status 201: added context`, resource: r })
        })
        .catch( err => {
            res.status(500).json({ message: `status 500: internal server error, could not add context` })
        })
})

router.use((req, res) => {
    res.status(404).json({ message: `status 404: resource not found in contexts` })
})

module.exports = router;