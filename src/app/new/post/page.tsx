"use client";
import CreatePostForm from "@/components/forms/CreatePostForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = () => {
    return (
      <div className="lg:w-full mt-4">
        <div className="flex p-3 mt-1 gap-3">
          <Link className="text-white text-lg" href="/home">
            <ArrowLeft />
          </Link>
          <h1 className="text-white font-semibold text-xl">Create Post</h1>
        </div>
        <CreatePostForm />
      </div>
    );
  };
export default Page;
