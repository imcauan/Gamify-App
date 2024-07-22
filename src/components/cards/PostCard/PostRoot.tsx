import { useQuery } from "@tanstack/react-query";
import React from "react";
import { PostCard } from ".";
import { PostEntity } from "@/entities/PostEntity";
import { fetchLikes } from "@/hooks/fetch-likes";

interface PostCardProps {
  post: PostEntity;
}

const PostRoot = ({ post }: PostCardProps) => {
  const { data: likes } = useQuery({
    queryKey: ["likes"],
    queryFn: () => fetchLikes(post?.id),
  });

  return (
    <div className="w-full p-4 flex flex-col gap-3 lg:bg-zinc-950 lg:rounded-lg">
      <PostCard.Informations post={post} />
      <PostCard.Image image={post.image} />
      <PostCard.Caption caption={post.caption} />
      <PostCard.Action post={post} likes={likes ?? []}/>
    </div>
  );
};

export default PostRoot;
