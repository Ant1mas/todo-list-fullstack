import { redirect } from 'next/navigation'

import { logout } from '@/lib/actions/auth'
import { getUser, verifySession } from '@/lib/dataAccessLayer'
import Link from 'next/link'

type Props = {}

export default async function page({}: Props) {
  const { isAuth } = await verifySession()
  const user = await getUser()

  if (!isAuth) {
    redirect('/login')
  }

  return (
    <div>
      <div>Профиль</div>
      <div>
        <div>
          <span>Id: </span>
          <span>{user.id}</span>
        </div>
        <div>
          <span>Логин: </span>
          <span>{user.login}</span>
        </div>
        <div>
          <span>Имя: </span>
          <span>{user.name}</span>
        </div>
        <div>
          <span>Фамилия : </span>
          <span>{user.last_name}</span>
        </div>
        <div>
          <span>Отчество : </span>
          <span>{user.middle_name}</span>
        </div>
        <div>
          <span>Id руководителя : </span>
          <span>{user.manager_id || 'нет'}</span>
        </div>
      </div>
      <form action={logout}>
        <button type="submit">Logout</button>
      </form>
      <button>
        <Link href="/tasks">Перейти на страницу задач</Link>
      </button>
    </div>
  )
}
