const knex = require('knex')
const db = knex(require('../knexfile'))

const express = require('express')
const router = express.Router()

const prRouter = require('./project-resources/prRouter');
const contextsRouter = require('./contexts/contextsRouter');
const projectsRouter = require('./projects/projectsRouter')
const resourcesRouter = require('./resources/resourcesRouter')
const tasksRouter = require('./tasks/tasksRouter');
const todoRouter = require('./todos/todoRouter');

router.use('/project-resources', prRouter);
router.use('/contexts', contextsRouter);
router.use('/projects', projectsRouter);
router.use('/resources', resourcesRouter);
router.use('/tasks', tasksRouter);
router.use('/todos', todoRouter);

const routesInfo = `
  <h1>API</h1>
  <div>
    <h2>Projects</h2>
  </div>
  <div>
    <h2>Resources</h2>
  </div>
  <div>
   <h2>Tasks</h2>
  </div>
  <div>
   <h2>Contexts</h2>
  </div>
`

router.get('/', (req, res) => {
    res.status(200).send(routesInfo)
})

router.use((req, res) => {
    res.status(404).json({ message: 'Not Found'})
})

module.exports = {
    db,
    router
}