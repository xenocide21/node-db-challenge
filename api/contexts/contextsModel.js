
const knex = require('knex');
const db = knex(require('../../knexfile').development);

module.exports = {
    findContexts,
    findContextById,
    addContext,
    removeContext,
}

function findContexts() {
    return db('contexts');
}

function findContextById(id) {
    return db('contexts').where({ id }).first();
}

function addContext(c) {
    return db('contexts').insert(c)
        .then( ids => {
            return findContextById(ids[0]);
        });
}

function removeContext(id) {
    return db('contexts').where({ id }).del();
}