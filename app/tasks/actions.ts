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
      .leftJoin('users as creator', 'tasks.created_by', 'creator.id')
      .leftJoin(
        'users as responsible',
        'tasks.responsible_user_id',
        'responsible.id',
      )
      .select(
        'tasks.*',
        'creator.login as creator_login',
        'responsible.login as responsible_login',
      )
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
      .leftJoin('users as creator', 'tasks.created_by', 'creator.id')
      .leftJoin(
        'users as responsible',
        'tasks.responsible_user_id',
        'responsible.id',
      )
      .where('responsible_user_id', userId)
      .select(
        'tasks.*',
        'creator.login as creator_login',
        'responsible.login as responsible_login',
      )
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
      .leftJoin('users as creator', 'tasks.created_by', 'creator.id')
      .leftJoin(
        'users as responsible',
        'tasks.responsible_user_id',
        'responsible.id',
      )
      .where('responsible.manager_id', '=', managerId)
      .select(
        'tasks.*',
        'creator.login as creator_login',
        'responsible.login as responsible_login',
      )
      .orderBy('updated_at', 'desc')
    return data
  } catch (error) {
    console.log('Failed to fetch tasks')
    return null
  }
})

export const getTaskById = cache(async (taskId: number) => {
  const session = await verifySession()
  if (!session) return null
  try {
    const knex = getKnex()
    const data = await knex('tasks')
      .leftJoin('users as creator', 'tasks.created_by', 'creator.id')
      .leftJoin(
        'users as responsible',
        'tasks.responsible_user_id',
        'responsible.id',
      )
      .where('tasks.id', taskId)
      .select(
        'tasks.*',
        'creator.login as creator_login',
        'responsible.login as responsible_login',
      )
      .orderBy('updated_at', 'desc')
    return data[0]
  } catch (error) {
    console.log('Failed to fetch task')
    return null
  }
})

export const updateTask = async (taskId: number, taskObj: object) => {}
