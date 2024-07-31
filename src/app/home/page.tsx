"use client";
import BottomBar from "@/components/common/BottomBar/BottomBar";
import { PostCard } from "@/components/cards/PostCard";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import Topbar from "@/components/common/Topbar/Topbar";
import Screen from "@/components/common/Screen";
import { usePostContext } from "@/hooks/usePostContext";
import React from "react";
import useAuthContext from "@/hooks/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/hooks/get-posts";
import { MessageBar } from "@/components/common/MessageBar/MessageBar";
import { PostEntity } from "@/entities/PostEntity";

const Page = () => {
  const { data: posts, } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:p-6 lg:flex lg:flex-col lg:gap-4">
        <div className="flex flex-col w-full gap-4">
          {posts?.map((post) => (
            <PostCard.Root key={post.id} post={post}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
