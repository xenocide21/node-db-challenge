const knex = require('knex')
const db = knex(require('../../knexfile').development)

module.exports = {
    findProjects,
    findProjectsById,
    addProject,
    removeProject
}

function findProjects() {
    return db('projects')
}

function findProjectsById(id) {
    return db('projects').where({id}).first
}

function addProject(p) {
    return db('projects').insert(p)
        .then(i => {
            return findProjectsById(i[0])
        })
}

function removeProject(id) {
    return db('projects').where({id}).del()
}