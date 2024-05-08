import { redirect } from 'next/navigation'

import { logout } from '@/lib/actions/auth'
import { verifySession } from '@/lib/dataAccessLayer'

type Props = {}

export default async function page({}: Props) {
  const { isAuth, userId } = await verifySession()

  if (!isAuth) {
    redirect('/login')
  }

  return (
    <div>
      <div>Tasks page</div>
      <div>
        {isAuth.toString()}
        {userId}
        <form action={logout}>
          <button type="submit">Logout</button>
        </form>
      </div>
    </div>
  )
}
