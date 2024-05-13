"use client";
import FormInput from "@/components/common/FormInput/FormInput";
import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserEntity } from "@/entities/UserEntity";
import useAuthContext from "@/hooks/useAuthContext";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
type TAuthToken = {
  token: string;
};

const Page = () => {
  const [user, setUser] = useState<UserEntity | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  let firstAccess: boolean;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: signInData) => {
    if (!values.email || !values.password) {
      return;
    }

    try {
      console.log(values);
      const response = await api
        .post<TAuthToken>("/user/signin", {
          email: values.email,
          password: values.password
        })
        .then((res) => res.data);
        if (!response) {
          return;
        }

       const accessToken = localStorage.setItem(
         "accessToken",
         response.token
       );

      firstAccess = true;
      me();
      router.push("/home");
      console.log("User logged in.");
      return accessToken
    } catch (error) {
      console.log(error);
    }
  };

  const me = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if(!accessToken) {
      console.log("accessToken not found.");
      router.push("/auth/signin");
    }

    const response = await api.get<UserEntity>("/user/me", {
      headers: {
        "accessToken": accessToken
      }}
    );
    if(!response) {
      router.push("/auth/signin")
      return;
    }
    const userData = response.data;
    setUser(userData);
    setIsAuthenticated(true);
    firstAccess && router.push("/home");
  };
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
};

export default Page;
