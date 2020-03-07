const prModel = require('./prModel')
const router = require('express').Router()

router.get('/', (req, res) => {
    prModel.findPr()
        .then( r => {
            res.status(200).json({ message: `status 200: fetched project resources`, resource: r })
        })
        .catch( err => {
            res.status(500).json({ message: `status 500: internal server error, could not fetch project resource`})
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    prModel.findPrById(id)
        .then( r => {
            res.status(200).json({ message: `status 200: fetched borrow`, resource: r })
        })
        .catch( err => {
            res.status(500).json({ message: `status 500: internal server error, could not fetch project resource` })
        })
})

router.post('/', (req, res) => {
    prModel.addPr(req.body)
        .then( r => {
            res.status(201).json({ message: `status 201: added project resource`, resource: r })
        })
        .catch( err => {
            res.status(500).json({ message: `status 500: internal server error, could not add project resource` })
        })
})

router.use((req, res) => {
    res.status(404).json({ message: `status 404: resource not found in borrows` })
})

module.exports = router;