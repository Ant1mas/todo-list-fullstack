/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      name: 'name1',
      last_name: 'last_name1',
      middle_name: 'middle_name1',
      login: 'user1',
      password: 'user1', // TODO: bcrypt
      manager_id: null,
    },
    {
      id: 2,
      name: 'name2',
      last_name: 'last_name2',
      middle_name: 'middle_name2',
      login: 'user2',
      password: 'user2', // TODO: bcrypt
      manager_id: null,
    },
    {
      id: 3,
      name: 'name3',
      last_name: 'last_name3',
      middle_name: 'middle_name3',
      login: 'user3',
      password: 'user3', // TODO: bcrypt
      manager_id: 1,
    },
    {
      id: 4,
      name: 'name4',
      last_name: 'last_name4',
      middle_name: 'middle_name4',
      login: 'user4',
      password: 'user4', // TODO: bcrypt
      manager_id: 1,
    },
    {
      id: 5,
      name: 'name5',
      last_name: 'last_name5',
      middle_name: 'middle_name5',
      login: 'user5',
      password: 'user5', // TODO: bcrypt
      manager_id: 2,
    },
  ])
}
