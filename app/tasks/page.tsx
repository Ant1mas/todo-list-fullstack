import { redirect } from 'next/navigation'

import { logout } from '@/lib/actions/auth'
import { verifySession } from '@/lib/dataAccessLayer'
import Link from 'next/link'

type Props = {}

export default async function page({}: Props) {
  const { isAuth, userId } = await verifySession()

  if (!isAuth) {
    redirect('/login')
  }

  return (
    <div>
      <div>Задачи</div>
      <div>
        <div>Id: {userId}</div>
        <form action={logout}>
          <button type="submit">Выйти из аккаунта</button>
        </form>
        <button>
          <Link href="/profile">Перейти в профиль</Link>
        </button>
      </div>
    </div>
  )
}
