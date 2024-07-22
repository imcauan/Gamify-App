import { LikeEntity } from "@/entities/LikeEntity";
import { PostEntity } from "@/entities/PostEntity";
import { CreateLike } from "@/hooks/create-like";
import { fetchLikes } from "@/hooks/fetch-likes";
import useAuthContext from "@/hooks/useAuthContext";
import { usePostContext } from "@/hooks/usePostContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bookmark, BookmarkCheck, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

interface PostActionsProps {
  post: PostEntity;
  likes: LikeEntity[];
}

const PostActions = ({ post, likes }: PostActionsProps) => {
  const queryClient = useQueryClient();
  const { mutateAsync: CreateLikeFn } = useMutation({
    mutationFn: CreateLike,
    onSuccess(_, variables) {
      const cached = queryClient.getQueryData(["likes"]);

      if(likes.find(l => l.authorId === user?.id!)) {
        return likes.length--
      }

      queryClient.setQueryData(["likes"], (data: LikeEntity[]) => {
        return [ ...data, {
          authorId: variables.authorId,
          postId: variables.postId
        } ];
      });
    },
  });
  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const [isSaved, setIsSaved] = React.useState<boolean>(false);
  const { likePost, savePost } = usePostContext();
  const { user } = useAuthContext();

  const handleLike = async () => {
    const request = await CreateLikeFn({
      authorId: user?.id!,
      postId: post.id,
    });
    
    setIsLiked(!isLiked);
  };

  const handleSavePost = async () => {
    await savePost(post.id, user?.id!);

    setIsSaved(!isSaved);
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
        {/* <p className="text-white">{likes.length}</p> */}
        <Link href={`/post/commentaries/?postId=${post.id}`}>
          <MessageCircle className="text-white" />
        </Link>
        <p className="text-white">{post?.commentaries.length}</p>
      </div>
      {isSaved ? (
        <BookmarkCheck
          className="text-white cursor-pointer"
          onClick={handleSavePost}
        />
      ) : (
        <Bookmark
          className="text-white cursor-pointer"
          onClick={handleSavePost}
        />
      )}
    </div>
  );
};

export default PostActions;
