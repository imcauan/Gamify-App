"use client";
import BottomBar from "@/components/common/BottomBar/BottomBar";
import { PostCard } from "@/components/PostCard";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import Topbar from "@/components/common/Topbar/Topbar";
import Screen from "@/components/common/Screen";
import { usePostContext } from "@/hooks/usePostContext";
import React from "react";

const Page = () => {
  const { posts } = usePostContext();
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:p-4">
       <h1 className="hidden font-bold text-white text-xl lg:flex mx-3">Home Feed</h1>
      {posts.map((post) => (
        <PostCard.Root key={post.id}>
          <PostCard.Informations post={post} />
          <PostCard.Image image={post.image} />
          <PostCard.Caption caption={post.caption} />
          <PostCard.Action />
        </PostCard.Root>
      ))}
        </div>
    </div>
  );
};

export default Page;
