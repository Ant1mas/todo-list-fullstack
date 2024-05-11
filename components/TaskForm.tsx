'use client'

import { useFormik } from 'formik'
import { observer } from 'mobx-react-lite'
import { useMemo, useState } from 'react'

import { createNewTask, updateTask } from '@/app/tasks/actions'
import FormFieldInput from '@/components/FormFieldInput'
import FormFieldSelect from '@/components/FormFieldSelect'
import { useMobxStore } from '@/lib/config/mobx/MobxProvider'
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
}

export default observer(function TaskForm({ task }: Props) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const mobxStore: any = useMobxStore()
  const finishDate = toDateTimeLocal(new Date(task?.finish_at || ''))
  const createdAt = dateToString(new Date(task?.created_at || '') || '')
  const updatedAt = dateToString(new Date(task?.updated_at || '') || '')
  const allowedFields = useMemo(
    () => getAllowedTaskFields(task, mobxStore.userData),
    [task, mobxStore.userData],
  )
  const formik = useFormik({
    initialValues: {
      title: task.title,
      description: task.description,
      responsible: task.responsible_login || mobxStore.userData.login,
      priority: task.priority,
      status: task.status,
      finishDate: finishDate,
    },
    validationSchema: schemaTaskData,
    onSubmit: async (values) => {
      setSuccessMessage(null)
      setErrorMessage(null)
      if (task?.id > 0) {
        try {
          await updateTask(task?.id || 0, values).then((result) => {
            setSuccessMessage('Данные успешно обновлены!')
            let updatedObject = result.data
            // Update tasks in store
            const taskIndex = mobxStore.tasks.findIndex(
              (storedTask: Task) => storedTask.id === task.id,
            )
            const taskFromStore = mobxStore.tasks[taskIndex]
            const updatedTaskForStore = {
              ...taskFromStore,
              title: updatedObject.title,
              description: updatedObject.description,
              priority: updatedObject.priority,
              status: updatedObject.status,
              responsible_user_id: updatedObject.responsible_user_id,
              responsible_login: updatedObject.responsible_login,
              finish_at: updatedObject.finish_at,
              updated_at: updatedObject.updated_at,
            }
            let updatedTasksFromStore = JSON.parse(
              JSON.stringify(mobxStore.tasks),
            )
            updatedTasksFromStore.splice(taskIndex, 1)
            updatedTasksFromStore.unshift(updatedTaskForStore)
            mobxStore.setTasks(updatedTasksFromStore)
          })
        } catch (error) {
          if (error?.toString() === 'Error: Validation Error') {
            setErrorMessage(
              'Указаны неверные данные. Пожалуйста проверьте данные.',
            )
          } else if (
            error?.toString() ===
            'Error: Error of getting responsible user data'
          ) {
            setErrorMessage(
              'Не удалось обновить данные. Нельзя указать ответственным этого пользователя.',
            )
          } else if (error?.toString() === 'Error: Wrong responsible user') {
            setErrorMessage(
              'Не удалось обновить данные. Можно указать ответственным только своего подчиненного.',
            )
          } else {
            setErrorMessage(
              'Не удалось обновить данные. Пожалуйста попробуйте позже.',
            )
          }
        }
      } else {
        try {
          await createNewTask(values).then((result) => {
            setSuccessMessage('Задача успешно добавлена!')
            let insertedObject: any = result?.data
            // Add task in store
            let updatedTasksFromStore = JSON.parse(
              JSON.stringify(mobxStore.tasks),
            )
            updatedTasksFromStore.unshift(insertedObject)
            mobxStore.setTasks(updatedTasksFromStore)
          })
        } catch (error) {
          if (error?.toString() === 'Error: Validation Error') {
            setErrorMessage(
              'Указаны неверные данные. Пожалуйста проверьте данные.',
            )
          } else if (
            error?.toString() ===
            'Error: Error of getting responsible user data'
          ) {
            setErrorMessage(
              'Не удалось обновить данные. Нельзя указать ответственным этого пользователя.',
            )
          } else {
            setErrorMessage(
              'Не удалось создать задачу. Пожалуйста попробуйте позже.',
            )
          }
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
      {task.id > 0 && (
        <div className="mb-2">
          <div>ID Задачи: {task?.id}</div>
          <div title={`ID: ${task?.created_by}`}>
            Создал: {task?.creator_login}
          </div>
          <div>Дата создания: {createdAt}</div>
          <div>Дата обновления: {updatedAt}</div>
        </div>
      )}
      <div className="max-w-72">
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
      </div>
      <button
        disabled={!!formik.isSubmitting}
        type="submit"
        className="mt-1 w-full rounded-3xl bg-green-500 px-4 py-2 text-white outline-none duration-150 hover:bg-green-600 focus:bg-green-600 disabled:bg-gray-400"
      >
        {!formik.isSubmitting && task.id > 0 ? 'Обновить' : null}
        {!formik.isSubmitting && task.id <= 0 ? 'Создать' : null}
        {formik.isSubmitting ? 'Выполняется...' : null}
      </button>
    </form>
  )
})
