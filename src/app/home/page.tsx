"use client";
import BottomBar from "@/components/BottomBar/BottomBar";
import PostCard from "@/components/PostCard/PostCard";
import Sidebar from "@/components/Sidebar/Sidebar";
import Topbar from "@/components/Topbar/Topbar"
import Screen from "@/components/common/Screen";
import useAuthContext from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  return (
      <Screen>
        <Topbar />
        <BottomBar />
        <Sidebar />
      </Screen>
  )
}

export default Page