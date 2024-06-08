import React from 'react'
import Logo from '../common/Logo'
import { Form } from '../ui/form'
import FormInput from '../common/FormInput/FormInput'
import { Button } from '../ui/button'
import Link from 'next/link'
import * as z from "zod";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useAuthContext from '@/hooks/useAuthContext'

const formSchema = z.object({
  username: z.string().max(100, {
    message: "Username cannot be bigger than 100 characters.",
  }),
  email: z
    .string()
    .max(100, {
      message: "Email cannot be bigger than 100 characters.",
    }).email(),
  password: z.string().max(100, {
    message: "Password cannot be bigger than 100 characters.",
  }),
});



export const SignUpForm = () => {

  const { signUp } = useAuthContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await signUp(values.username, values.email, values.password)
    
    if(!signUp) {
      return;
    }
    
  };
  return (
    <div className="flex flex-col justify-center items-center w-full">
         <Logo />
         <h1 className="font-semibold text-white text-lg">Welcome to Gamify!</h1>
         <p className="font-semibold text-white text-base">
           Please, register to <span className="text-red-600">use our app.</span>
         </p>
         <Form {...form}>
           <form
             className="flex flex-col w-full gap-2 sm:w-1/2"
             onSubmit={form.handleSubmit(onSubmit)}
           >
             <FormInput 
               form={form} 
               name="username" 
               label="Username:" 
             />
             <FormInput 
               form={form} 
               name="email" 
               label="Email:" 
             />
             <FormInput
               form={form}
               name="password"
               label="Password:"
               type="password"
               />
             <Button
               type="submit"
               className="w-full rounded-3xl font-semibold text-lg bg-red-600 text-white p-6 mt-4 hover:bg-red-800"
               >
               SIGN UP
             </Button>
           </form>
         </Form>
         <Link href="/auth/signin" className="text-white mt-2">
           Do you have an account?{" "}
           <span className="text-red-600 font-bold text-base">Login</span>
         </Link>
       </div>
  )
}
