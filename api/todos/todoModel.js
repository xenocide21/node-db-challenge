
const knex = require('knex');
const db = knex(require('../../knexfile').development);

module.exports = {
    findTodos,
    findTodoById, //findTodoById(id)
    addTodo, //addTodo(t)
    removeTodo, //removeTodo(id)

    findContextsByTaskId, //findContextsByTaskId(taskId)
}

function findTodos() {
    return db('todos');
}

function findTodoById(id) {
    return db('todos').where({ id }).first();
}

function addTodo(t) {
    return db('todos').insert(t)
        .then( ids => {
            return findTodoById(ids[0]);
        });
}

function removeTodo(id) {
    return db('todos').where({ id }).del();
}

function findContextsByTaskId(taskId) {
    return db.select().from('todos as t')
        .where({ task_id: taskId })
        .join('contexts as c', 'c.id', 't.context_id')
        .orderBy('c.id');
}