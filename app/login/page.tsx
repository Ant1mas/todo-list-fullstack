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
    <div className="flex flex-col justify-center items-center p-5 min-h-screen">
      <div className="text-2xl pb-4 uppercase font-light">Авторизация</div>
      <LoginForm />
    </div>
  )
}
