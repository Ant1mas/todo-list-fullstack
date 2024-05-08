import 'server-only'

import { cookies } from 'next/headers'
import { cache } from 'react'

import { getKnex } from '@/lib/knex'
import { decrypt } from '@/lib/session'

export const verifySession = cache(async () => {
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)
  if (!session?.userId) {
    return { isAuth: false, userId: null }
  }
  return { isAuth: true, userId: session.userId }
})

export const getUser = cache(async () => {
  const session = await verifySession()
  if (!session) return null
  try {
    const knex = getKnex()
    const data = await knex('users').where('id', session.userId)
    const user = data[0]
    return user
  } catch (error) {
    console.log('Failed to fetch user')
    return null
  }
})
