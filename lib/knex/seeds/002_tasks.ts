import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('tasks').del()
  await knex('tasks').insert([
    {
      id: 1,
      title: 'Task 1',
      description: 'Description for task 1',
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
      finish_at: '2024-05-07 18:01:01.123456',
      created_at: '2024-05-06 18:02:02.123456',
      updated_at: '2024-05-06 18:02:02.123456',
      priority: 'high',
      status: 'canceled',
      created_by: 2,
      responsible_user_id: 5,
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Description for task 3',
      finish_at: '2024-05-07 18:01:01.123456',
      created_at: '2024-05-06 18:03:03.123456',
      updated_at: '2024-05-06 18:03:03.123456',
      priority: 'low',
      status: 'in progress',
      created_by: 4,
      responsible_user_id: 4,
    },
    {
      id: 4,
      title: 'Task 4',
      description: 'Description for task 4',
      finish_at: '2024-05-20 18:04:04.123456',
      created_at: '2024-05-01 18:04:04.123456',
      updated_at: '2024-05-06 18:04:04.123456',
      priority: 'low',
      status: 'to do',
      created_by: 4,
      responsible_user_id: 4,
    },
  ])
}
