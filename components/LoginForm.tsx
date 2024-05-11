import LoginError from '@/components/LoginError'
import { signin } from '@/lib/actions/auth'

type Props = {}

export default function LoginForm({}: Props) {
  return (
    <div>
      <form action={signin} className="flex w-72 flex-col gap-4">
        <input
          id="login"
          name="login"
          placeholder="Логин"
          className="rounded-2xl border border-transparent bg-gray-100 px-6 py-4 outline-none duration-150 hover:border-gray-200"
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          className="rounded-2xl border border-transparent bg-gray-100 px-6 py-4 outline-none duration-150 hover:border-gray-200"
        />
        <button
          type="submit"
          className="rounded-2xl bg-green-500 px-4 py-2 text-white duration-150 hover:bg-green-600"
        >
          Войти
        </button>
      </form>
      <LoginError />
    </div>
  )
}
