import { redirect } from 'next/navigation'

import ButtonAddNewTask from '@/components/ButtonAddNewTask'
import DataGroupButtons from '@/components/DataGroupButtons'
import TasksTable from '@/components/TasksTable'
import { getUserData } from '@/lib/dataAccessLayer'

import type { GroupBy } from '@/app/tasks/types'

type SearchParams = { [key: string]: string | string[] | undefined }
type Props = { searchParams: SearchParams }

export default async function page({ searchParams }: Props) {
  const userData = await getUserData()
  const groupBy: GroupBy = searchParams.groupBy?.toString() || undefined

  if (!groupBy) {
    redirect('?groupBy=noGroup')
  }

  if (groupBy === 'byResponsibleUser' && userData.manager_id !== null) {
    redirect('?groupBy=noGroup')
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
        <ButtonAddNewTask userData={userData} />
      </div>
      <TasksTable />
    </div>
  )
}
