import type { Task } from '@/app/tasks/types'

export const PRIORITIES = {
  low: 'Низкий',
  middle: 'Средний',
  high: 'Высокий',
}

export const PRIORITY_SWITCH_OPTIONS = Object.keys(PRIORITIES).map(
  (statusKey: string) => {
    // @ts-ignore
    const status: string = PRIORITIES[statusKey]
    return { value: statusKey, label: status }
  },
)

export const STATUSES = {
  'to do': 'К выполнению',
  'in progress': 'Выполняется',
  done: 'Выполнена',
  canceled: 'Отменена',
}

export const STATUS_SWITCH_OPTIONS = Object.keys(STATUSES).map(
  (statusKey: string) => {
    // @ts-ignore
    const status: string = STATUSES[statusKey]
    return { value: statusKey, label: status }
  },
)

export const DEFAULT_NEW_TASK: Task = {
  id: 0,
  title: '',
  description: '',
  finish_at: new Date().toString(),
  created_at: '',
  updated_at: '',
  priority: 'middle',
  status: 'to do',
  created_by: 0,
  responsible_user_id: 0,
  creator_login: '',
  responsible_login: '',
}
