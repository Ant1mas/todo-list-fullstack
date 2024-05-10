'use server'

import { revalidatePath } from 'next/cache'
import { cache } from 'react'

import { getUserByLogin } from '@/lib/actions/users'
import { schemaTaskData } from '@/lib/config/yup/taskData'
import { getUserData, verifySession } from '@/lib/dataAccessLayer'
import { getAllowedTaskFields } from '@/lib/functions/getAllowedTaskFields'
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

export const updateTask = async (taskId: number, taskObj: any) => {
  const session = await verifySession()
  if (!session) return null
  let userData: any = {}
  let responsibleUserData: any = {}
  let taskDataDb: any = {}
  let allowedFields: any = {}
  // Validate fields
  try {
    await schemaTaskData.validate(taskObj)
  } catch (error) {
    throw new Error('Validation Error')
  }
  // Get users data
  try {
    userData = await getUserData()
  } catch (error) {
    throw new Error('Error of getting user data')
  }
  // Get responsible user data
  try {
    responsibleUserData = await getUserByLogin(taskObj.responsible)
    if (!responsibleUserData) {
      throw new Error('Error of getting responsible user data')
    }
  } catch (error) {
    throw new Error('Error of getting responsible user data')
  }
  // Get task data
  try {
    taskDataDb = await getTaskById(taskId)
  } catch (error) {
    throw new Error('Error of getting task data')
  }
  // Get allowed fields
  allowedFields = getAllowedTaskFields(taskDataDb, userData)
  // Check manager assignments
  try {
    const userData = await getUserData()
    if (userData.manager_id === null) {
      if (responsibleUserData.manager_id !== userData.id) {
        throw new Error('Wrong responsible user')
      }
    }
  } catch (error) {
    throw new Error('Wrong responsible user')
  }
  try {
    const knex = getKnex()
    await knex('tasks')
      .where('id', taskId)
      .update({
        title: allowedFields.title ? taskObj.title : taskDataDb.title,
        description: allowedFields.description
          ? taskObj.description
          : taskDataDb.description,
        responsible_user_id: allowedFields.responsible
          ? responsibleUserData.id
          : taskDataDb.responsible_user_id,
        priority: allowedFields.priority
          ? taskObj.priority
          : taskDataDb.priority,
        status: allowedFields.status ? taskObj.status : taskDataDb.status,
        finish_at: allowedFields.finishDate
          ? new Date(taskObj.finishDate)
          : taskDataDb.finish_at,
        updated_at: new Date(),
      })
      .then((numberOfUpdatedRows: number) => {
        revalidatePath('/tasks')
        return numberOfUpdatedRows
      })
  } catch (error) {
    console.log('Failed to update task')
    return null
  }
}

export const createNewTask = async (taskObj: any) => {
  const session = await verifySession()
  if (!session) return null
  try {
    const knex = getKnex()
    const data = await knex('tasks')
    // .leftJoin('users as creator', 'tasks.created_by', 'creator.id')
    // .leftJoin(
    //   'users as responsible',
    //   'tasks.responsible_user_id',
    //   'responsible.id',
    // )
    // .where('tasks.id', taskId)
    // .select(
    //   'tasks.*',
    //   'creator.login as creator_login',
    //   'responsible.login as responsible_login',
    // )
    // .orderBy('updated_at', 'desc')
  } catch (error) {
    console.log('Failed to create task')
    return null
  }
}
