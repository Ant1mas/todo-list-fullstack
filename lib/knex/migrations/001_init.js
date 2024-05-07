/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('last_name').notNullable()
    table.string('middle_name').notNullable()
    table.string('login').notNullable().unique()
    table.string('password').notNullable()
    table.integer('manager_id').references('id').inTable('users')
  })

  await knex.schema.createTable('tasks', (table) => {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.string('description').notNullable()
    table.boolean('completed').notNullable().defaultTo(false)
    table.timestamp('finish_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
    table.string('priority').notNullable().defaultTo('middle') // 'low', 'middle', 'high'.
    table.string('status').notNullable().defaultTo('to do') // 'to do', 'in progress', 'done', 'canceled'.
    table.integer('created_by').references('id').inTable('users').notNullable()
    table
      .integer('responsible_user_id')
      .references('id')
      .inTable('users')
      .notNullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.raw('DROP TABLE users CASCADE')
  await knex.raw('DROP TABLE tasks CASCADE')
}
