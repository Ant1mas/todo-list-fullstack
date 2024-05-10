export type Task = {
  id: number
  title: string
  description: string
  completed: boolean
  finish_at: string
  created_at: string
  updated_at: string
  priority: 'low' | 'middle' | 'high'
  status: 'to do' | 'done' | 'in progress' | 'canceled'
  created_by: number
  responsible_user_id: number
  creator_login: string
  responsible_login: string
}

export type GroupBy =
  | 'noGroup'
  | 'byFinishDate'
  | 'byResponsibleUser'
  | string
  | undefined
  | null
