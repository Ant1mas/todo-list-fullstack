import TaskRow from '@/components/TaskRow'
import { getUserData } from '@/lib/dataAccessLayer'

import type { Task } from '@/app/tasks/types'

type Props = {
  tasks: {
    today: Task[]
    week: Task[]
    future: Task[]
  }
}

const ORDER = ['today', 'week', 'future']
const GROUPS_DICTIONARY: { [key: string]: string } = {
  today: 'Сегодня',
  week: 'На неделе',
  future: 'На будущее',
}

export default async function TasksGroupedByFinish({ tasks }: Props) {
  const userData = await getUserData()

  return ORDER.map((group: string) => {
    return (
      <>
        <tr>
          <td colSpan={5} className="text-center font-bold pt-3">
            {GROUPS_DICTIONARY[group]}
          </td>
        </tr>
        {/* @ts-ignore */}
        {tasks[group]?.map((task: Task) => {
          return <TaskRow task={task} key={task.id} userData={userData} />
        })}
      </>
    )
  })
}
