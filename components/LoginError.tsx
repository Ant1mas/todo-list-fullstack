'use client'

import { useSearchParams } from 'next/navigation'

type Props = {}

export default function LoginError({}: Props) {
  const searchParams = useSearchParams()
  const serverError = searchParams.get('error')?.toString()

  return (
    <div className="mt-2 flex min-h-12 w-72 justify-center text-center text-red-500">
      {serverError === 'wrongLogin'
        ? 'Пользователь с таким логином не существует'
        : null}
      {serverError === 'invalidPassword' ? 'Неверный пароль' : null}
    </div>
  )
}
