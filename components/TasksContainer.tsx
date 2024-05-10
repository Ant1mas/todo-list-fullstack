'use client'

import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useState } from 'react'

import TasksGroupedByFinish from '@/components/TasksGroupedByFinish'
import TasksGroupedByResponsibleUser from '@/components/TasksGroupedByResponsibleUser'
import TasksUngrouped from '@/components/TasksUngrouped'
import { useMobxStore } from '@/lib/config/mobx/MobxProvider'
import { groupTasks } from '@/lib/functions/groupTasks'
import { useSearchParams } from 'next/navigation'

import type { Task } from '@/app/tasks/types'

type Props = {
  tasks: Task[]
  userData: any
}

export default observer(function TasksContainer({ tasks, userData }: Props) {
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
  const mobxStore: any = useMobxStore()

  useEffect(() => {
    mobxStore.userData = userData
  }, [userData])

  useEffect(() => {
    mobxStore.tasks = tasks
  }, [tasks])

  if (groupBy === 'byFinishDate') {
    return <TasksGroupedByFinish tasks={tasksGroupedByFinishDate} />
  }

  if (groupBy === 'byResponsibleUser') {
    return (
      <TasksGroupedByResponsibleUser tasks={tasksGroupedByResponsibleUser} />
    )
  }

  return <TasksUngrouped tasks={tasksState} />
})
