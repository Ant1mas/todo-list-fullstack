import type { Task } from '@/app/tasks/types'

type DisabledFields = {
  title?: boolean
  description?: boolean
  responsible?: boolean
  priority?: boolean
  status?: boolean
  finishDate?: boolean
}

export const getAllowedTaskFields = (
  taskData: Task,
  userData: any,
): DisabledFields => {
  let allowedFields = {
    title: false,
    description: false,
    responsible: false,
    priority: false,
    status: false,
    finishDate: false,
  }
  if (userData.manager_id === null) {
    allowedFields = {
      title: true,
      description: true,
      responsible: true,
      priority: true,
      status: true,
      finishDate: true,
    }
  } else {
    if (
      taskData.responsible_user_id === userData.id &&
      taskData.created_by === userData.id
    ) {
      allowedFields = {
        title: true,
        description: true,
        responsible: true,
        priority: true,
        status: true,
        finishDate: true,
      }
    } else if (
      taskData.responsible_user_id === userData.id &&
      taskData.created_by !== userData.id
    ) {
      allowedFields = {
        title: false,
        description: false,
        responsible: false,
        priority: false,
        status: true,
        finishDate: false,
      }
    } else {
      allowedFields = {
        title: false,
        description: false,
        responsible: false,
        priority: false,
        status: false,
        finishDate: false,
      }
    }
  }
  return allowedFields
}
