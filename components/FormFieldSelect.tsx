'use client'

import { clsx } from 'clsx'

type Props = {
  formik: any
  fieldName: string
  options: {
    value: string
    label: string
  }[]
  label?: string
}

export default function FormFieldSelect({
  formik,
  fieldName,
  options = [],
  label = '',
}: Props) {
  return (
    <>
      <label htmlFor={fieldName} className="ml-4 flex">
        {label}
      </label>
      <select
        name={fieldName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[fieldName]}
        className={clsx(
          'flex w-full rounded-3xl border bg-transparent px-4 py-2 placeholder-gray-600 outline-none disabled:bg-slate-300',
          formik.touched[fieldName] && formik.errors[fieldName]
            ? 'border-red-500'
            : 'border-gray-500',
        )}
      >
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
      <div className="ml-4 flex h-4 text-sm text-red-500">
        {formik.touched[fieldName] && formik.errors[fieldName] ? (
          <div>{formik.errors[fieldName]}</div>
        ) : null}
      </div>
    </>
  )
}
