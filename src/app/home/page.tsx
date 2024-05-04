"use client";
import PostCard from "@/components/PostCard/PostCard";
import Sidebar from "@/components/Sidebar/Sidebar";
import Topbar from "@/components/Topbar/Topbar"
import useAuthContext from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  return (
      <div className="bg-black w-full h-screen flex flex-col">
        <Topbar />
        <Sidebar />
      </div>
  )
}

export default Page