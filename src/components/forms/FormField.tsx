import React from 'react'
import { UseFormRegister, FieldError } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FormField as FormFieldType } from '@/types/form'
import { cn } from '@/lib/utils'

interface FormFieldProps {
  field: FormFieldType
  register: UseFormRegister<any>
  error?: FieldError
  value?: any
  onChange?: (value: any) => void
}

export function FormField({ field, register, error, value, onChange }: FormFieldProps) {
  const renderInput = () => {
    const baseClasses = cn(
      "w-full",
      error && "border-red-500 focus:border-red-500"
    )

    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            {...register(field.name, { required: field.required })}
            placeholder={field.placeholder}
            className={baseClasses}
          />
        )

      case 'select':
        return (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className={baseClasses}>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      default:
        return (
          <Input
            {...register(field.name, { required: field.required })}
            type={field.type}
            placeholder={field.placeholder}
            className={baseClasses}
          />
        )
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={field.name} className="text-sm font-medium">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {renderInput()}
      {error && (
        <p className="text-sm text-red-600">{error.message}</p>
      )}
    </div>
  )
}

interface FormSectionProps {
  title: string
  children: React.ReactNode
}

export function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  )
}