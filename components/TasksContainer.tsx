'use client'

import { useMemo, useState } from 'react'

import type { Task } from '@/app/tasks/types'
import TasksGroupedByFinish from '@/components/TasksGroupedByFinish'
import TasksGroupedByResponsibleUser from '@/components/TasksGroupedByResponsibleUser'
import TasksUngrouped from '@/components/TasksUngrouped'
import { groupTasks } from '@/lib/functions/groupTasks'
import { useSearchParams } from 'next/navigation'

type Props = {
  tasks: Task[]
  userData: any
}

export default function TasksContainer({ tasks, userData }: Props) {
  const searchParams = useSearchParams()
  const groupBy = searchParams.get('groupBy')
  const [tasksState, setTasksState] = useState<Task[]>(tasks)
  const tasksGroupedByFinishDate = useMemo(() => {
    // TODO: Filter only my tasks
    //
    return groupTasks(tasksState, 'byFinishDate')
  }, [tasksState])
  const tasksGroupedByResponsibleUser = useMemo(() => {
    // TODO: Filter only tasks with my workers
    //
    return groupTasks(tasksState, 'byResponsibleUser')
  }, [tasksState])

  if (groupBy === 'byFinishDate') {
    return (
      <TasksGroupedByFinish
        tasks={tasksGroupedByFinishDate}
        userData={userData}
      />
    )
  }

  if (groupBy === 'byResponsibleUser') {
    return (
      <TasksGroupedByResponsibleUser
        tasks={tasksGroupedByResponsibleUser}
        userData={userData}
      />
    )
  }

  return <TasksUngrouped tasks={tasksState} userData={userData} />
}
