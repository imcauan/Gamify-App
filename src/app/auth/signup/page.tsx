"use client";
import FormInput from "@/components/FormInput";
import Logo from "@/components/common/Logo";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";

const formSchema = z.object({
  username: z.string().max(100, {
    message: "Username cannot be bigger than 100 characters.",
  }),
  email: z
    .string()
    .max(100, {
      message: "Email cannot be bigger than 100 characters.",
    })
    .email(),
  password: z.string().max(100, {
    message: "Password cannot be bigger than 100 characters.",
  }),
});

type signUpData = z.infer<typeof formSchema>;

const Page = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const userData = await api
      .post("/auth/signup", {
        email: values.email,
        username: values.username,
        password: values.password,
      })
      .then((res) => res.data);

    if (userData) {
      router.push("/auth/signin");
    } else {
      throw Error("Something went wrong while creating user.");
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-slate-950 gap-2 py-14">
      <div className="none lg:w-full lg:h-screen lg:bg-white"></div>
      <div className="flex flex-col justify-center items-center w-full">
        <Logo />
        <h1 className="font-semibold text-white text-lg">Welcome to Gamify!</h1>
        <p className="font-semibold text-white text-base">
          Please, register to <span className="text-red-600">use our app.</span>
        </p>
        <Form {...form}>
          <form
            className="flex flex-col w-full gap-2 p-4 :px-12"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormInput form={form} name="username" label="Username:" />
            <FormInput form={form} name="email" label="Email:" />
            <FormInput form={form} name="password" label="Password:" />
            <Button
              type="submit"
              className="w-full rounded-3xl font-semibold text-lg bg-red-600 text-white p-6 mt-4 hover:bg-red-800"
            >
              SIGN UP
            </Button>
          </form>
        </Form>
        <Link href="/auth/signin" className="text-white ">
          Do you have an account?{" "}
          <span className="text-red-600 font-bold text-base">Login</span>
        </Link>
      </div>
    </div>
  );
};

export default Page;
