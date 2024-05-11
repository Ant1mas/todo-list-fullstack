import * as Yup from 'yup'

import { PRIORITIES, STATUSES } from '@/lib/constants/tasks'

export const schemaTaskData = Yup.object({
  title: Yup.string().max(50, 'Разрешено быть 50 символов или меньше'),
  description: Yup.string().max(250, 'Разрешено быть 250 символов или меньше'),
  responsible: Yup.string().required('Обязательно к заполнению'),
  priority: Yup.string()
    .oneOf(Object.keys(PRIORITIES), 'Неверное значение')
    .required('Обязательно к заполнению'),
  status: Yup.string()
    .oneOf(Object.keys(STATUSES), 'Неверное значение')
    .required('Обязательно к заполнению'),
  finishDate: Yup.date()
    .typeError('Неправильный формат даты')
    .required('Обязательно к заполнению'),
})
