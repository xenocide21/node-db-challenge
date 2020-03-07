const express = require('express')

server = express()

server.use(express.json())
server.use(require('helmet')())
server.use(require('morgan')('common'))

const { router } = require('/api/apiRouter')

server.use('api', router)

server.get('/', (req, res) => {
    res.status(200).send('message: Node-DB-Challenge API')
})

server.use((req,res) => {
    res.status(404).json({message: 'Error 404: Not Found'})
})

module.exports = server