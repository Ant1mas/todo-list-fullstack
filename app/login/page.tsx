import { redirect } from 'next/navigation'

import LoginForm from '@/components/LoginForm'
import { verifySession } from '@/lib/dataAccessLayer'

type Props = {}

export default async function page({}: Props) {
  const { isAuth } = await verifySession()

  if (isAuth) {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-5">
      <h2 className="pb-4 text-2xl font-light uppercase">Авторизация</h2>
      <LoginForm />
    </div>
  )
}
