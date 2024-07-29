"use client";
import CreatePostForm from "@/components/forms/CreatePostForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = () => {
    return (
      <div className="mt-4 lg:px-4">
        <div className="flex p-3 mt-1 gap-3">
          <Link className="flex text-white text-lg lg:hidden" href="/home">
            <ArrowLeft />
          </Link>
          <h1 className="text-white font-semibold text-xl">Create Post</h1>
        </div>
        <CreatePostForm />
      </div>
    );
  };
export default Page;
