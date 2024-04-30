"use client";
import FormInput from "@/components/FormInput";
import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { UserEntity } from "@/entities/UserEntity";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z
    .string()
    .max(100, {
      message: "Username cannot be bigger than 100 characters.",
    })
    .email(),
  password: z.string().max(100, {
    message: "Password cannot be bigger than 100 characters.",
  }),
});

type signInData = z.infer<typeof formSchema>;

const Page = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (user: signInData) => {
    try {
      const getUser = await api
        .post<UserEntity>("/user/signin",
          {
            email: user.email,
            password: user.password
          }
        )
        .then((res) => res.data);
        if(!getUser) {
          throw Error("The email or the password must be wrong.")
        } 
        router.push(`/dashboard`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-slate-950 gap-2 py-14">
      <Logo />
      <h1 className="font-semibold text-white text-lg">Welcome back!</h1>
      <p className="font-semibold text-white text-base">
        Please, login to <span className="text-red-600">use our app.</span>
      </p>
      <Form {...form}>
        <form
          className="flex flex-col gap-2 w-full p-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput form={form} name="email" label="Email:" />
          <FormInput form={form} name="password" label="Password:" type="password" />
          <Button
            type="submit"
            className="w-full rounded-3xl font-semibold text-lg bg-red-600 text-white p-6 mt-4 hover:bg-red-800"
          >
            LOGIN
          </Button>
        </form>
      </Form>
      <Link href="/auth/signup" className="text-white hover:text-neutral-300">
        Don't you have an account?{" "}
        <span className="text-red-600 font-bold text-base hover:text-red-800">
          Register
        </span>
      </Link>
    </div>
  );
};

export default Page;
