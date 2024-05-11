import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getUserData, verifySession } from '@/lib/dataAccessLayer'

export default async function layout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuth } = await verifySession()
  const userData = await getUserData()

  if (!isAuth) {
    redirect('/login')
  }

  return (
    <div className="flex flex-col items-center">
      <header className="inline-flex h-10 w-full items-center justify-end gap-2 p-2">
        <div>Привет, {userData.login}</div>
        <Link href="/profile">
          <button className="rounded-2xl bg-slate-200 px-4 py-2 text-sm uppercase text-gray-800 duration-150 hover:bg-slate-300">
            Профиль
          </button>
        </Link>
      </header>
      <main className="w-full max-w-7xl">{children}</main>
    </div>
  )
}
