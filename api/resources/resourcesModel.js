const knex = require('knex');
const db = knex(require('../../knexfile').development);

module.exports = {
    findResources,
    findResourceById,
    addResource,
    removeResource,
}

function findResources() {
    return db('resources');
}

function findResourceById(id) {
    return db('resources').where({ id }).first();
}

function addResource(r) {
    return db('resources').insert(r)
        .then( ids => {
            return findResourceById(ids[0]);
        });
}

function removeResource(id) {
    return db('resources').where({ id }).del();
}