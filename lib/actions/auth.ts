'use server'

import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

import { getKnex } from '@/lib/config/knex'
import { createSession, deleteSession } from '@/lib/session'

export async function signin(formData: FormData) {
  // Validate form fields
  const login = formData.get('login')
  const password: string = formData.get('password')?.toString() || ''
  // Get user data by login
  const knex = getKnex()
  const user = await knex('users').where('login', login)
  if (user.length > 0) {
    // Check password (bcrypt)
    const isPasswordCorrect = bcrypt.compareSync(password, user[0].password)
    if (isPasswordCorrect) {
      await createSession(user[0].id)
      redirect('/')
    } else {
      redirect('/login?error=invalidPassword')
    }
  } else {
    redirect('/login?error=wrongLogin')
  }
}

export async function logout() {
  deleteSession()
  redirect('/login')
}
