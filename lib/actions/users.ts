import { cache } from 'react'

import { verifySession } from '@/lib/dataAccessLayer'
import { getKnex } from '@/lib/knex'

export const getUserById = cache(async (userId: number) => {
  const session = await verifySession()
  if (!session) return null
  try {
    const knex = getKnex()
    const data = await knex('users').where('id', userId)
    const user = data[0]
    return user
  } catch (error) {
    throw new Error('Failed to fetch user')
  }
})

export const getUserByLogin = cache(async (userLogin: number) => {
  const session = await verifySession()
  if (!session) return null
  try {
    const knex = getKnex()
    const data = await knex('users').where('login', userLogin)
    const user = data[0]
    if (data.length < 1) {
      throw new Error('User not found')
    }
    return user
  } catch (error) {
    throw new Error('Failed to fetch user')
  }
})

export const getSubordinatesById = cache(async (userId: number) => {
  const session = await verifySession()
  if (!session) return null
  try {
    const knex = getKnex()
    const users = await knex('users').where('manager_id', userId)
    if (users.length < 1) {
      throw new Error('Users not found')
    }
    return users
  } catch (error) {
    throw new Error('Failed to fetch user')
  }
})
