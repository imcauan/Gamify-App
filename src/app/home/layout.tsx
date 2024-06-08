"use client";

import BottomBar from "@/components/common/BottomBar/BottomBar";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import Topbar from "@/components/common/Topbar/Topbar";
import Screen from "@/components/common/Screen";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Screen>
      <Topbar />
      <Sidebar />
      {children}
      <BottomBar />
    </Screen>
  );
};

export default HomeLayout;
