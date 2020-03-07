const knex = require('knex');
const db = knex(require('../../knexfile').development);

module.exports = {
    findPr,
    findPrById,
    addPr,
    removePr,
    findResourcesByProjectId
}

function findPr() {
    return db('project-resources');
}

function findPrById(id) {
    return db('project-resources').where({ id }).first();
}

function addPr(b) {
    return db('project-resources').insert(b)
        .then( i => {
            return findPrById(i[0]);
        });
}

function removePr(id) {
    return db('project-resources').where({ id }).del();
}

function findResourcesByProjectId(projectId) {
    return db.select('*').from('project-resources as pr')
        .where({ project_id: projectId })
        .join('resources as r', 'pr.resource_id', 'r.id')
}