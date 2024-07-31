"use client";

import BottomBar from "@/components/common/BottomBar/BottomBar";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import Topbar from "@/components/common/Topbar/Topbar";
import Screen from "@/components/common/Screen";
import React from "react";
import { MessageBar } from "@/components/common/MessageBar/MessageBar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Screen className="lg:flex flex-col lg:flex-row lg:justify-between">
      <Topbar />
      <Sidebar />
      {children}
      <BottomBar />
      <MessageBar />
    </Screen>
  );
};

export default HomeLayout;
