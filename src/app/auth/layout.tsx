import Screen from "@/components/common/Screen";
import Container from "@/components/ui/container";
import { AuthProvider } from "@/contexts/AuthContext";
import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
      <Screen>
        <div className="flex justify-center items-center w-full h-screen lg:p-6">
          <Container alignment="center">{children}</Container>
        </div>
      </Screen>
  );
};

export default AuthLayout;
