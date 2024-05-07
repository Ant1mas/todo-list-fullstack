/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('tasks').del()
  await knex('tasks').insert([
    {
      id: 1,
      title: 'Task 1',
      description: 'Description for task 1',
      completed: true,
      finish_at: '2024-05-07 18:01:01.123456',
      created_at: '2024-05-06 18:01:01.123456',
      updated_at: '2024-05-06 18:01:01.123456',
      priority: 'middle',
      status: 'done',
      created_by: 1,
      responsible_user_id: 3,
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description for task 2',
      completed: true,
      finish_at: '2024-05-07 18:01:01.123456',
      created_at: '2024-05-06 18:01:02.123456',
      updated_at: '2024-05-06 18:01:02.123456',
      priority: 'high',
      status: 'done',
      created_by: 2,
      responsible_user_id: 5,
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Description for task 3',
      completed: true,
      finish_at: '2024-05-07 18:01:01.123456',
      created_at: '2024-05-06 18:01:03.123456',
      updated_at: '2024-05-06 18:01:03.123456',
      priority: 'low',
      status: 'in progress',
      created_by: 4,
      responsible_user_id: 4,
    },
    {
      id: 4,
      title: 'Task 4',
      description: 'Description for task 4',
      completed: false,
      finish_at: '2024-05-02 18:01:04.123456',
      created_at: '2024-05-01 18:01:04.123456',
      updated_at: '2024-05-06 18:01:04.123456',
      priority: 'low',
      status: 'in progress',
      created_by: 4,
      responsible_user_id: 4,
    },
  ])
}
