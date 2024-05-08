import { redirect } from 'next/navigation'

import { signin } from '@/lib/actions/auth'
import { verifySession } from '@/lib/dataAccessLayer'

type Props = {}

export default async function page({}: Props) {
  const { isAuth } = await verifySession()

  if (isAuth) {
    redirect('/')
  }

  return (
    <div>
      <form action={signin}>
        <input id="login" name="login" placeholder="Login" />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
