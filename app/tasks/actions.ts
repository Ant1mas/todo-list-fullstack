'use server'

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
    throw new Error('Failed to fetch task')
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
    throw new Error('Failed to fetch task')
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
    if (
      taskObj.responsible !== taskDataDb.responsible_login &&
      userData.manager_id === null
    ) {
      if (responsibleUserData.manager_id !== userData.id) {
        throw new Error('Wrong responsible user')
      }
    }
  } catch (error) {
    throw new Error('Wrong responsible user')
  }
  const newObject = {
    title: allowedFields.title ? taskObj.title : taskDataDb.title,
    description: allowedFields.description
      ? taskObj.description
      : taskDataDb.description,
    responsible_user_id: allowedFields.responsible
      ? responsibleUserData.id
      : taskDataDb.responsible_user_id,
    priority: allowedFields.priority ? taskObj.priority : taskDataDb.priority,
    status: allowedFields.status ? taskObj.status : taskDataDb.status,
    finish_at: allowedFields.finishDate
      ? new Date(taskObj.finishDate)
      : taskDataDb.finish_at,
    updated_at: new Date(),
  }
  try {
    const knex = getKnex()
    const result = await knex('tasks')
      .where('id', taskId)
      .update(newObject)
      .then((numberOfUpdatedRows: any) => {
        return {
          numberOfUpdatedRows,
          data: { ...newObject, responsible_login: taskObj.responsible },
        }
      })
    return result
  } catch (error) {
    throw new Error('Failed to update task')
  }
}

export const createNewTask = async (taskObj: any) => {
  const session = await verifySession()
  if (!session) return null
  let userData: any = {}
  let responsibleUserData: any = {}
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
  // Check assigned responsible user
  if (taskObj.responsible !== userData.login) {
    if (
      userData.manager_id !== null ||
      responsibleUserData.manager_id !== userData.id
    ) {
      throw new Error('Wrong responsible user')
    }
  }
  const newObject = {
    title: taskObj.title,
    description: taskObj.description,
    responsible_user_id: responsibleUserData.id,
    priority: taskObj.priority,
    status: taskObj.status,
    finish_at: new Date(taskObj.finishDate),
    updated_at: new Date(),
    created_by: userData.id,
  }
  try {
    const knex = getKnex()
    const result = await knex('tasks')
      .insert(newObject)
      .returning(['id', 'created_at'])
    return {
      data: {
        ...newObject,
        id: result[0].id,
        created_at: result[0].created_at,
        responsible_login: taskObj.responsible,
        creator_login: userData.login,
      },
    }
  } catch (error) {
    throw new Error('Failed to create task')
  }
}
