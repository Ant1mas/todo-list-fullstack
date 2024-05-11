'use client'

import { observer } from 'mobx-react-lite'
import { useEffect, useMemo } from 'react'

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
  subordinates: any
}

export default observer(function TasksContainer({
  tasks,
  userData,
  subordinates,
}: Props) {
  const searchParams = useSearchParams()
  const groupBy = searchParams.get('groupBy')
  const mobxStore: any = useMobxStore()
  const tasksGroupedByFinishDate = useMemo(() => {
    const filteredTasks = mobxStore.tasks.filter(
      (task: Task) => task.responsible_user_id === userData.id,
    )
    return groupTasks(filteredTasks, 'byFinishDate')
  }, [mobxStore.tasks])
  const tasksGroupedByResponsibleUser = useMemo(() => {
    let subordinatesId = new Set()
    subordinates.forEach((subordinate: any) => {
      subordinatesId.add(subordinate.id)
    })
    const filteredTasks = mobxStore.tasks.filter((task: Task) =>
      subordinatesId.has(task.responsible_user_id),
    )
    return groupTasks(filteredTasks, 'byResponsibleUser')
  }, [mobxStore.tasks])

  useEffect(() => {
    mobxStore.setUserData(userData)
  }, [JSON.stringify(userData)])

  useEffect(() => {
    if (mobxStore.tasks.length <= 0) {
      mobxStore.setTasks(JSON.parse(JSON.stringify(tasks)))
    }
  }, [JSON.stringify(tasks)])

  useEffect(() => {
    mobxStore.setSubordinatesData(subordinates)
  }, [JSON.stringify(subordinates)])

  if (groupBy === 'byFinishDate') {
    return <TasksGroupedByFinish tasks={tasksGroupedByFinishDate} />
  }

  if (groupBy === 'byResponsibleUser') {
    return (
      <TasksGroupedByResponsibleUser tasks={tasksGroupedByResponsibleUser} />
    )
  }

  return <TasksUngrouped tasks={mobxStore.tasks} />
})
