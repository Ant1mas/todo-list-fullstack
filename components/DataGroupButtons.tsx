import clsx from 'clsx'

import type { GroupBy } from '@/app/tasks/types'
import Link from 'next/link'

type Props = {
  groupBy?: GroupBy
  isManager?: boolean
}

export default function DataGroupButtons({
  groupBy = 'noGroup',
  isManager = false,
}: Props) {
  return (
    <div className="flex gap-4 items-center flex-wrap">
      <span>Группировать:</span>
      <Link href="?groupBy=noGroup">
        <button
          className={clsx(
            'bg-slate-200 text-gray-900 uppercase text-sm px-4 py-2 rounded-xl duration-150 hover:bg-slate-300',
            groupBy === 'noGroup' ? 'bg-slate-300 cursor-default' : null,
          )}
        >
          Без группировки
        </button>
      </Link>
      <Link href="?groupBy=byFinishDate">
        <button
          className={clsx(
            'bg-slate-200 text-gray-900 uppercase text-sm px-4 py-2 rounded-xl duration-150 hover:bg-slate-300',
            groupBy === 'byFinishDate' ? 'bg-slate-300 cursor-default' : null,
          )}
        >
          Дата завершения
        </button>
      </Link>
      {isManager && (
        <Link href="?groupBy=byResponsibleUser">
          <button
            className={clsx(
              'bg-slate-200 text-gray-900 uppercase text-sm px-4 py-2 rounded-xl duration-150 hover:bg-slate-300',
              groupBy === 'byResponsibleUser'
                ? 'bg-slate-300 cursor-default'
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
