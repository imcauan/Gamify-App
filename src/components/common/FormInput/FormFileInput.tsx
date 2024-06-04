import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from '@/components/ui/form'
import React, { ComponentPropsWithRef } from 'react'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { Input } from '@/components/ui/input'

interface FormFileInputProps<T extends FieldValues>
  extends Omit<ComponentPropsWithRef<"input">, "form"> {
  form: UseFormReturn<T>,
  name: Path<T>,
  label?: string
}

export default function FormFileInput<T extends FieldValues>({ 
  name,
  form,
  label,
  ...props
}: FormFileInputProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
           <FormLabel className="text-white">{ label }</FormLabel>
            <Input
              type="file"
              className='bg-zinc-900 text-white border-none p-2'
              {...field}
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
