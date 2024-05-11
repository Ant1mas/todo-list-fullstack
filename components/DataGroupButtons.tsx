import clsx from 'clsx'
import Link from 'next/link'

import type { GroupBy } from '@/app/tasks/types'

type Props = {
  groupBy?: GroupBy
  isManager?: boolean
}

export default function DataGroupButtons({
  groupBy = 'noGroup',
  isManager = false,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <span>Группировать:</span>
      <Link href="?groupBy=noGroup">
        <button
          className={clsx(
            'rounded-xl bg-slate-200 px-4 py-2 text-sm uppercase text-gray-900 duration-150 hover:bg-slate-300',
            groupBy === 'noGroup' ? 'cursor-default bg-slate-300' : null,
          )}
        >
          Без группировки
        </button>
      </Link>
      <Link href="?groupBy=byFinishDate">
        <button
          className={clsx(
            'rounded-xl bg-slate-200 px-4 py-2 text-sm uppercase text-gray-900 duration-150 hover:bg-slate-300',
            groupBy === 'byFinishDate' ? 'cursor-default bg-slate-300' : null,
          )}
        >
          Дата завершения
        </button>
      </Link>
      {isManager && (
        <Link href="?groupBy=byResponsibleUser">
          <button
            className={clsx(
              'rounded-xl bg-slate-200 px-4 py-2 text-sm uppercase text-gray-900 duration-150 hover:bg-slate-300',
              groupBy === 'byResponsibleUser'
                ? 'cursor-default bg-slate-300'
                : null,
            )}
          >
            Ответственные
          </button>
        </Link>
      )}
    </div>
  )
}
