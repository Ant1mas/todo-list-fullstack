import { redirect } from 'next/navigation'

import { getAllTasks, getManagerTasks, getUserTasks } from '@/app/tasks/actions'
import DataGroupButtons from '@/components/DataGroupButtons'
import TasksList from '@/components/TasksList'
import { getUserData, verifySession } from '@/lib/dataAccessLayer'

import type { GroupBy, Task } from '@/app/tasks/types'

type SearchParams = { [key: string]: string | string[] | undefined }
type Props = { searchParams: SearchParams }

export default async function page({ searchParams }: Props) {
  const { isAuth, userId } = await verifySession()
  const userData = await getUserData()
  const groupBy: GroupBy = searchParams.groupBy?.toString() || undefined

  if (!isAuth) {
    redirect('/login')
  }

  if (!groupBy) {
    redirect('?groupBy=noGroup')
  }

  if (groupBy === 'byResponsibleUser' && userData.manager_id !== null) {
    redirect('?groupBy=noGroup')
  }

  let tasks: Task[] = []

  if (groupBy === 'noGroup') {
    tasks = await getAllTasks()
  } else if (groupBy === 'byFinishDate') {
    tasks = await getUserTasks(userId)
  } else if (groupBy === 'byResponsibleUser' && userData.manager_id === null) {
    tasks = await getManagerTasks(userId)
  }

  return (
    <div className="flex flex-col items-center p-5">
      <h2 className="text-2xl pb-4 uppercase font-light">Задачи</h2>
      <div className="flex w-full">
        <DataGroupButtons
          groupBy={groupBy}
          isManager={userData.manager_id === null}
        />
      </div>
      <div className="my-4 w-full">
        <button className="w-full bg-blue-400 text-white uppercase text-sm px-10 py-3 rounded-2xl duration-150 hover:bg-blue-500">
          Добавить новую задачу
        </button>
      </div>
      <TasksList tasks={tasks} groupBy={groupBy} />
    </div>
  )
}
