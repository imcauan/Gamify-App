"use client"

import useAuthContext from "@/hooks/useAuthContext"
import { ComponentPropsWithRef } from "react"

interface PostCaptionProps extends ComponentPropsWithRef<"p"> {
    caption: string
}

const PostCaption = ({ caption, ...props}: PostCaptionProps) => {
  const { user } = useAuthContext();
  return (
    <div className="flex gap-2">
      <p className="hidden lg:flex text-white font-semibold">{user?.username}</p>
      <p { ...props} className="text-white w-full text-wrap">
        { caption }
      </p>
    </div>
  )
}

export default PostCaption