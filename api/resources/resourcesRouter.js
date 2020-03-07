
const resourcesModel = require('./resourcesModel');
const router = require('express').Router();

router.get('/', (req, res) => {
    resourcesModel.findResources()
        .then( r => {
            res.status(200).json({ message: `status 200: fetched resources`, resource: r })
        })
        .catch( err => {
            res.status(500).json({ message: `status 500: internal server error, could not fetch resources` })
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    resourcesModel.findResourceById(id)
        .then( r => {
            res.status(200).json({ message: `status 200: fetched resource`, resource: r })
        })
        .catch( err => {
            res.status(500).json({ message: `status 500: internal server error, could not fetch resource` })
        })
})

router.post('/', (req, res) => {
    resourcesModel.addResource(req.body)
        .then( r => {
            res.status(201).json({ message: `status 201: added resource`, resource: r })
        })
        .catch( err => {
            res.status(500).json({ message: `status 500: internal server error, could not add resource` })
        })
})

router.use((req, res) => {
    res.status(404).json({ message: `status 404: resource not found in resources` })
})

module.exports = router;