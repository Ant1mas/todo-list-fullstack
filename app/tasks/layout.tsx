import { redirect } from 'next/navigation'

import { getUserData, verifySession } from '@/lib/dataAccessLayer'
import Link from 'next/link'

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
      <header className="h-10 p-2 w-full inline-flex items-center justify-end gap-2">
        <div>Привет, {userData.login}</div>
        <Link href="/profile">
          <button className="px-4 py-2 bg-slate-200 uppercase text-sm text-gray-800 rounded-2xl duration-150 hover:bg-slate-300">
            Профиль
          </button>
        </Link>
      </header>
      <main className="w-full max-w-7xl">{children}</main>
    </div>
  )
}
