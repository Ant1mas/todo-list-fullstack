import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del()
  await knex('users').insert([
    {
      name: 'name1',
      last_name: 'last_name1',
      middle_name: 'middle_name1',
      login: 'user1',
      password: '$2y$10$mgqKBX4QDfl04H/h.qlOd.QGEyVb6roAqe3SypFEpntmDDb/Rnt/O', // user1. bcrypt 10
      manager_id: null,
    },
    {
      name: 'name2',
      last_name: 'last_name2',
      middle_name: 'middle_name2',
      login: 'user2',
      password: '$2y$10$l.d4Rb9dEYG34Z3Mtn003eyWnTg6/L7QPz7bc9hqqeqIBeT84iBZa', // user2
      manager_id: null,
    },
    {
      name: 'name3',
      last_name: 'last_name3',
      middle_name: 'middle_name3',
      login: 'user3',
      password: '$2y$10$JaczNd.gQMV2vfTibhvNUuEtatjqnfj4H4Pzka9L.BFfm7qF9Ov4W', // user3
      manager_id: 1,
    },
    {
      name: 'name4',
      last_name: 'last_name4',
      middle_name: 'middle_name4',
      login: 'user4',
      password: '$2y$10$BTDlGnLUduHNgrxTMSoIc.zGWoKCBXxQvxS.OtQ7dV5rY0fkTS7Ye', // user4
      manager_id: 1,
    },
    {
      name: 'name5',
      last_name: 'last_name5',
      middle_name: 'middle_name5',
      login: 'user5',
      password: '$2y$10$R.oU6rb.QE3XWn/sv6RYgORnRBgNRLXlsfsxjGZnKCTAqLv7Fwdbe', // user5
      manager_id: 2,
    },
    {
      name: 'name6',
      last_name: 'last_name6',
      middle_name: 'middle_name6',
      login: 'user6',
      password: '$2y$10$6FqM0IEkKYz4BKH9AzDYS.mABAGmPm/kIvp13gcmJLCWu3JNTWUAO', // user6
      manager_id: 2,
    },
  ])
}
