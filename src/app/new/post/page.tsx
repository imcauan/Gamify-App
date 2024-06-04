"use client";
import BottomBar from "@/components/BottomBar/BottomBar";
import CreatePostForm from "@/components/forms/CreatePostForm";
import React from "react";

const Page = () => {
    return (
      <>
        <div className="flex p-3 mt-1">
          <h1 className="text-white font-semibold text-xl">Create Post</h1>
        </div>
        <CreatePostForm />
        <BottomBar />
      </>
    );
  };
export default Page;
