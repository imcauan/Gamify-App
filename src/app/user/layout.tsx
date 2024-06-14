import BottomBar from "@/components/common/BottomBar/BottomBar";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import Screen from "@/components/common/Screen";
import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Screen>
      <Sidebar />
        {children}
      <BottomBar />
    </Screen>
  );
};

export default UserLayout;