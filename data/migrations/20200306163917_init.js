exports.up = async function(knex) {
    await knex.schema
        .createTable('projects', tbl => {
            tbl.increments().unsigned()
            tbl.string('name', 128).notNullable()
            tbl.text('description')
            tbl.boolean('completed').notNullable().defaultTo(0)
        })
        .createTable('tasks', tbl => {
            tbl.increments().unsigned()
            tbl.text('description').notNullable()
            tbl.text('notes')
            tbl.boolean('completed').notNullable().defaultTo(0)
            tbl.integer('projectId')
                .unsigned()
                .references('id')
                .inTable('projects')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
        })
        .createTable('resources', tbl => {
            tbl.increments().unsigned()
            tbl.string('name', 128).notNullable().defaultTo(0)
            tbl.text('description')
        })
};

exports.down = async function(knex) {
    await knex.schema
        .dropTableIfExists('resources')
        .dropTableIfExists('tasks')
        .dropTableIfExists('projects')
};
