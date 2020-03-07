const knex = require('knex');
const db = knex(require('../../knexfile').development);

module.exports = {
    findTasks,
    findTaskById,
    addTask,
    removeTask,
    findTasksByProjectId,
}

function findTasks() {
    return db.select('t.id', 't.description', 't.notes', 't.completed', 'p.name as ProjectName', 'p.description as ProjectDescription').from('tasks as t')
        .join('projects as p', 'p.id', 't.project_id')
}

function findTaskById(id) {
    return db('tasks').where({ id }).first();
}

function addTask(t) {
    return db('tasks').insert(t)
        .then( i => {
            return findTaskById(i[0]);
        });
}

function removeTask(id) {
    return db('tasks').where({ id }).del();
}

function findTasksByProjectId(projectId) {
    return db('tasks').where({ project_id: projectId });
}