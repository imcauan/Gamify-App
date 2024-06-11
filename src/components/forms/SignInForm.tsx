import useAuthContext from "@/hooks/useAuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput  from "../common/FormInput/FormInput";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import Link from "next/link";
import Logo from "../common/Logo";
import { Form } from "../ui/form";

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

export const SignInForm = () => {
  const { signIn } = useAuthContext();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await signIn(values.email, values.password);

    if (!signIn) {
      return;
    }

    router.push("/home");
    router.refresh();
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Logo />
      <h1 className="font-semibold text-white text-lg">Welcome back!</h1>
      <p className="font-semibold text-white text-base">
        Please, login to <span className="text-red-600">use our app.</span>
      </p>
      <Form {...form}>
        <form
          className="flex flex-col w-full gap-2 sm:w-1/2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput form={form} name="email" label="Email:" />
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
            SIGN IN
          </Button>
        </form>
      </Form>
      <Link href="/auth/signup" className="text-white mt-2">
        Don't you have an account?{" "}
        <span className="text-red-600 font-bold text-base">Register</span>
      </Link>
    </div>
  );
};
