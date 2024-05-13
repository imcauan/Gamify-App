import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { ComponentPropsWithRef } from "react"
import { FieldValues, Path, UseFormReturn } from "react-hook-form"

interface FormTextareaProps<T extends FieldValues> 
extends Omit<ComponentPropsWithRef<"textarea">, "form"> {
    name: Path<T>,
    form: UseFormReturn<T>,
    label: string,
}

const FormTextarea = <T extends FieldValues>({
    label,
    name,
    form,
    ...props
}: FormTextareaProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">{ label }</FormLabel>
          <FormControl>
            <Textarea
              className="bg-zinc-900 border-none w-full text-white h-12"
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

export default FormTextarea