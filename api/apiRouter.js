const knex = require('knex')
const db = knex(require('../knexfile'))

const express = require('express')
const router = express.Router()

const projectRouter = require('')
const resourceRouter = require('')

router.use('/projects', projectRouter)
router.use('/resources', resourceRouter)

router.get('/', (req, res) => {
    res.status(200).send('Connected to api router')
})

router.use((req, res) => {
    res.status(404).json({ message: 'Not Found'})
})

module.exports = {
    db,
    router
}