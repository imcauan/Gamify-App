import { ComponentPropsWithRef } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { 
    FormField, 
    FormItem, 
    FormLabel, 
    FormControl, 
    FormMessage 
} from "./ui/form";
import { Input } from "./ui/input";

interface FormInputProps<T extends FieldValues>
  extends Omit<ComponentPropsWithRef<"input">, "form"> {
  form: UseFormReturn<T>,
  name: Path<T>,
  label?: string
}

const FormInput = <T extends FieldValues>({
  form,
  name,
  label,
  ...props
}: FormInputProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">{ label }</FormLabel>
          <FormControl>
            <Input 
              className="bg-zinc-900 border-none w-full text-white h-12"
              {...field} 
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
