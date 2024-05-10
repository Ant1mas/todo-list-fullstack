'use server'

import { cache } from 'react'

import { verifySession } from '@/lib/dataAccessLayer'
import { getKnex } from '@/lib/knex'

export const getAllTasks = cache(async () => {
  const session = await verifySession()
  if (!session) return null
  try {
    const knex = getKnex()
    const data = await knex('tasks')
      .join('users', 'tasks.responsible_user_id', 'users.id')
      .select('tasks.*', 'users.login')
      .orderBy('updated_at', 'desc')
    return data
  } catch (error) {
    console.log('Failed to fetch tasks')
    return null
  }
})

export const getUserTasks = cache(async (userId: number) => {
  const session = await verifySession()
  if (!session) return null
  try {
    const knex = getKnex()
    const data = await knex('tasks')
      .join('users', 'tasks.responsible_user_id', 'users.id')
      .where('responsible_user_id', userId)
      .select('tasks.*', 'users.login')
      .orderBy('updated_at', 'desc')
    return data
  } catch (error) {
    console.log('Failed to fetch tasks')
    return null
  }
})

export const getManagerTasks = cache(async (managerId: number) => {
  const session = await verifySession()
  if (!session) return null
  try {
    const knex = getKnex()
    const data = await knex('tasks')
      .join('users', 'tasks.responsible_user_id', 'users.id')
      .where('users.manager_id', '=', managerId)
      .select('tasks.*', 'users.login')
      .orderBy('updated_at', 'desc')
    return data
  } catch (error) {
    console.log('Failed to fetch tasks')
    return null
  }
})