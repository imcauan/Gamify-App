"use client"

import { UserEntity } from "@/entities/UserEntity";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import React from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  user: UserEntity | undefined;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (username: string, email: string, password: string) => Promise<void>
  signOut: () => void;
  me: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextProps>(
  {} as AuthContextProps
);

type TAuthToken = {
  token: string
}
let firstAccess: boolean;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<UserEntity | undefined>();
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const router = useRouter();

  const signUp = async (username: string, email: string, password: string) => {
    const userData = await api
    .post("/user/signup", {
      username,
      email,
      password,
    })
    .then((res) => res.data);
    router.push("/auth/signin");
  }

  const signIn = async (email: string, password: string) => {
    console.log({ email, password });
    if(!email || !password) {
      return;
    }
    try {
      const response = await api
        .post<TAuthToken>("/user/signin", {
          email,
          password
        })
        .then((res) => res.data);
        const accessToken = localStorage.setItem("accessToken", response.token);

        if(!response) {
          router.push("/auth/signin")
          return;
        }
        
        firstAccess = true
        me();

    } catch (error) {
    };
  }

  const me = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if(!accessToken) {
      console.log("accessToken not found.");
      router.push("/auth/signin");
    }

    const response = await api.get<UserEntity>("/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }}
    )


    if(!response) {
      router.push("/auth/signin")
      throw Error("Request for get user data wasn't completed.")      
    }
    
    setUser(response.data);
    setIsAuthenticated(true);

    firstAccess && router.push("/home");
  };

  const signOut = async () => {
    await api.post("/auth/logout");
    setUser(undefined);
  };

  React.useEffect(() => {
    me();
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signOut, signIn, me, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};
