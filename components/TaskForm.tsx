'use client'

import type { Task } from '@/app/tasks/types'
import { dateToString } from '@/lib/functions/dateToString'

type Props = {
  task: Task | null
  onUpdated?: () => any
}

export default function TaskForm({ task, onUpdated }: Props) {
  const finishDate = dateToString(new Date(task?.finish_at || ''))
  const createdAt = dateToString(new Date(task?.created_at || ''))
  const updatedAt = dateToString(new Date(task?.updated_at || ''))
  return (
    <div className="flex flex-col">
      <div className="text-lg mb-4 self-center">{task?.title}</div>
      <div>ID: {task?.id}</div>
      <div>Описание: {task?.description}</div>
      <div>Ответственный: {task?.responsible_login}</div>
      <div>Приоритет: {task?.priority}</div>
      <div>Статус: {task?.status}</div>
      <div>Дата окончания: {finishDate}</div>
      <div>Создал: {task?.creator_login}</div>
      <div>Дата создания: {createdAt}</div>
      <div>Дата обновления: {updatedAt}</div>
    </div>
  )
}
