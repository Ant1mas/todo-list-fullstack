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
    console.log('Failed to fetch user')
    return null
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
    console.log('Failed to fetch user')
    return null
  }
})
