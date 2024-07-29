import BottomBar from "@/components/common/BottomBar/BottomBar";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import Screen from "@/components/common/Screen";
import React from "react";
import { MessageBar } from "@/components/common/MessageBar/MessageBar";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Screen>
      <MessageBar />
        {children}
    </Screen>
  );
};

export default UserLayout;