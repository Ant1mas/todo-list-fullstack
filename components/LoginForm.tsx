import LoginError from '@/components/LoginError'
import { signin } from '@/lib/actions/auth'

type Props = {}

export default function LoginForm({}: Props) {
  return (
    <div>
      <form action={signin} className="flex flex-col gap-4 w-72">
        <input
          id="login"
          name="login"
          placeholder="Логин"
          className="bg-gray-100 px-6 py-4 rounded-2xl outline-none duration-150 border border-transparent hover:border-gray-200"
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          className="bg-gray-100 px-6 py-4 rounded-2xl outline-none duration-150 border border-transparent hover:border-gray-200"
        />
        <button
          type="submit"
          className="bg-green-500 px-4 py-2 rounded-2xl text-white hover:bg-green-600 duration-150"
        >
          Войти
        </button>
      </form>
      <LoginError />
    </div>
  )
}
