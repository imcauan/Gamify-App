import { LikeEntity } from "@/entities/LikeEntity";
import { PostEntity } from "@/entities/PostEntity";
import { CreateLike } from "@/hooks/create-like";
import useAuthContext from "@/hooks/useAuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

interface PostActionsProps {
  post: PostEntity;
  likes: LikeEntity[];
}

const PostActions = ({ post, likes }: PostActionsProps) => {
  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  const { mutateAsync: CreateLikeFn } = useMutation({
    mutationFn: CreateLike,
    onSuccess(_, variables) {
      const cached = queryClient.getQueryData(["likes"]);

      if (likes.find((l) => l.authorId === user?.id!)) {
        return likes.length--;
      }

      queryClient.setQueryData(["likes"], (data: LikeEntity[]) => {
        return [
          ...data,
          {
            authorId: variables.authorId,
            postId: variables.postId,
          },
        ];
      });
    },
  });

  const handleLike = async () => {
    const request = await CreateLikeFn({
      authorId: user?.id!,
      postId: post.id,
    });

    setIsLiked(!isLiked);
  };
  return (
    <div className="flex items-center justify-between w-full space-y-2 ">
      <div className="flex gap-2 cursor-pointer">
        <Heart
          className={
            isLiked
              ? "text-red-600 cursor-pointer"
              : "text-white cursor-pointer"
          }
          onClick={handleLike}
        />
        <Link href={`/post/commentaries/?postId=${post.id}`}>
          <MessageCircle className="text-white" />
        </Link>
        <p className="text-white">{post?.commentaries.length}</p>
      </div>
    </div>
  );
};

export default PostActions;
