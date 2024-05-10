'use client'

import { useFormik } from 'formik'
import { useMemo, useState } from 'react'

import { updateTask } from '@/app/tasks/actions'
import FormFieldInput from '@/components/FormFieldInput'
import FormFieldSelect from '@/components/FormFieldSelect'
import { schemaTaskData } from '@/lib/config/yup/taskData'
import {
  PRIORITY_SWITCH_OPTIONS,
  STATUS_SWITCH_OPTIONS,
} from '@/lib/constants/tasks'
import { dateToString } from '@/lib/functions/dateToString'
import { getAllowedTaskFields } from '@/lib/functions/getAllowedTaskFields'
import { toDateTimeLocal } from '@/lib/functions/toDateTimeLocal'

import type { Task } from '@/app/tasks/types'

type Props = {
  task: Task
  userData?: object
  onUpdated?: () => any
}

export default function TaskForm({ task, userData, onUpdated }: Props) {
  const [taskState, setTaskState] = useState<Task>(task)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const finishDate = toDateTimeLocal(new Date(taskState?.finish_at || ''))
  const createdAt = dateToString(new Date(taskState?.created_at || ''))
  const updatedAt = dateToString(new Date(taskState?.updated_at || ''))
  const allowedFields = useMemo(
    () => getAllowedTaskFields(taskState, userData),
    [taskState, userData],
  )
  const formik = useFormik({
    initialValues: {
      title: taskState.title,
      description: taskState.description,
      responsible: taskState.responsible_login,
      priority: taskState.priority,
      status: taskState.status,
      finishDate: finishDate,
    },
    validationSchema: schemaTaskData,
    onSubmit: async () => {
      try {
        setSuccessMessage(null)
        setErrorMessage(null)
        await updateTask(taskState?.id || 0, taskState || {}).then(() => {
          setSuccessMessage('Данные успешно обновлены!')
        })
      } catch (error) {
        if (error?.toString() === 'Error: Validation Error') {
          setErrorMessage(
            'Указаны неверные данные. Пожалуйста проверьте данные.',
          )
        } else {
          setErrorMessage(
            'Не удалось обновить данные. Пожалуйста попробуйте позже.',
          )
        }
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="my-1">
        <FormFieldInput
          formik={formik}
          fieldName="title"
          fieldType="text"
          placeholder="Заголовок"
          label="Заголовок"
          disabled={!allowedFields.title}
        />
      </div>
      <div className="my-1">
        <FormFieldInput
          formik={formik}
          fieldName="description"
          fieldType="text"
          placeholder="Описание"
          label="Описание"
          disabled={!allowedFields.description}
        />
      </div>
      <div className="my-1">
        <FormFieldInput
          formik={formik}
          fieldName="responsible"
          fieldType="text"
          placeholder="Ответственный"
          label="Ответственный"
          disabled={!allowedFields.responsible}
        />
      </div>
      <div className="my-1">
        <FormFieldSelect
          formik={formik}
          fieldName="priority"
          label="Приоритет"
          options={PRIORITY_SWITCH_OPTIONS}
          disabled={!allowedFields.priority}
        />
      </div>
      <div className="my-1">
        <FormFieldSelect
          formik={formik}
          fieldName="status"
          label="Статус"
          options={STATUS_SWITCH_OPTIONS}
          disabled={!allowedFields.status}
        />
      </div>
      <div className="my-1">
        <FormFieldInput
          formik={formik}
          fieldName="finishDate"
          fieldType="datetime-local"
          placeholder="Дата окончания"
          label="Дата окончания"
          disabled={!allowedFields.finishDate}
        />
      </div>
      <div className="mb-2">
        <div>ID Задачи: {taskState?.id}</div>
        <div title={`ID: ${taskState?.created_by}`}>
          Создал: {taskState?.creator_login}
        </div>
        <div>Дата создания: {createdAt}</div>
        <div>Дата обновления: {updatedAt}</div>
      </div>
      {successMessage && (
        <div className="my-1 flex justify-center text-center text-green-500">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="my-1 flex justify-center text-center text-red-500">
          {errorMessage}
        </div>
      )}
      <button
        disabled={!!formik.isSubmitting}
        type="submit"
        className="mt-1 w-full rounded-3xl bg-green-500 px-4 py-2 text-white outline-none duration-150 hover:bg-green-600 focus:bg-green-600 disabled:bg-gray-400"
      >
        {!formik.isSubmitting ? 'Обновить' : null}
        {formik.isSubmitting ? 'Выполняется...' : null}
      </button>
    </form>
  )
}
