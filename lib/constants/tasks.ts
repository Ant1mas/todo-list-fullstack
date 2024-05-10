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
