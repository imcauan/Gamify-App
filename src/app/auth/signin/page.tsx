"use client";
import FormInput from "@/components/FormInput";
import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  username: z.string().max(100, {
    message: "Username cannot be bigger than 100 characters.",
  }),
  password: z.string().max(100, {
    message: "Password cannot be bigger than 100 characters.",
  }),
});

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <div className="flex w-full h-screen bg-slate-950">
      <div className="w-1/2 h-full bg-white"></div>
      <div
        {...form}
        className="flex w-1/2 flex-col gap-6 items-center text-center mt-6 px-36"
      >
        <div className="flex flex-col gap-4">
          <Logo />
          <h2 className="font-extrabold text-3xl text-white">Welcome back!</h2>
          <p className="text-white font-semibold text-lg leading-7">
            Please, login to <span className="text-red-600">use our app.</span>
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full px-6 text-left">
          <Form {...form}>
            <FormInput form={form} name="username" label="Username:" />
            <FormInput form={form} name="password" label="Password:" />
            <Button className="w-full rounded-3xl font-semibold text-lg bg-red-600 text-white p-6 mt-4 hover:bg-red-800">
              SIGN IN
            </Button>
          </Form>
        </div>
        <Link
          href="/auth/signup"
          className=" text-white flex gap-2 text-center"
        >
          Don't you have an account
          <span className="text-red-600">Sign up</span>
        </Link>
      </div>
    </div>
  );
};

export default Page;
