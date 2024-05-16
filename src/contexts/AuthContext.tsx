"use client"

import { UserEntity } from "@/entities/UserEntity";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useEffect, useState } from "react";


interface AuthContextProps {
  isAuthenticated: boolean;
  user: UserEntity | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (username: string, email: string, password: string) => Promise<void>
  signOut: () => void;
  me: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

type TAuthToken = {
  accessToken: string
}
let firstAccess: boolean;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserEntity | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
        const accessToken = localStorage.setItem("accessToken", response.accessToken);

        if(!response) {
          return;
        }
        
        firstAccess = true

        useEffect(() => {
          me();
        }, [])
        
    } catch (error) {
      console.log(error);
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

  const signOut = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signOut, signIn, me, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};
