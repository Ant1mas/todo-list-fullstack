import Link from 'next/link'
import { redirect } from 'next/navigation'

import { logout } from '@/lib/actions/auth'
import { getUserData, verifySession } from '@/lib/dataAccessLayer'

type Props = {}

export default async function page({}: Props) {
  const { isAuth } = await verifySession()
  const user = await getUserData()

  if (!isAuth) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-5">
      <div className="rounded-2xl bg-white p-10">
        <h2 className="pb-4 text-center text-2xl font-light uppercase">
          Профиль
        </h2>
        <div className="my-4 flex flex-col gap-2">
          <div>
            <span>ID: </span>
            <span className="font-bold">{user.id}</span>
          </div>
          <div>
            <span>Логин: </span>
            <span className="font-bold">{user.login}</span>
          </div>
          <div>
            <span>Имя: </span>
            <span className="font-bold">{user.name}</span>
          </div>
          <div>
            <span>Фамилия : </span>
            <span className="font-bold">{user.last_name}</span>
          </div>
          <div>
            <span>Отчество : </span>
            <span className="font-bold">{user.middle_name}</span>
          </div>
          <div>
            <span>Должность : </span>
            <span className="font-bold">
              {user.manager_id !== null ? 'Подчиненный' : 'Руководитель'}
            </span>
          </div>
          {user.manager_id && (
            <div>
              <span>ID руководителя : </span>
              <span className="font-bold">{user.manager_id || 'нет'}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center">
          <form action={logout}>
            <button
              type="submit"
              className="rounded-2xl bg-red-500 px-4 py-2 text-white duration-150 hover:bg-red-600"
            >
              Выйти из аккаунта
            </button>
          </form>

          <Link href="/tasks">
            <button className="mt-2 rounded-2xl bg-gray-500 px-4 py-2 text-white duration-150 hover:bg-gray-600">
              Перейти на страницу задач
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
