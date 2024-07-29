"use client"

import { UserEntity } from "@/entities/UserEntity"
import { ComponentPropsWithRef } from "react"

interface PostCaptionProps extends ComponentPropsWithRef<"p"> {
    caption: string
    author: UserEntity
}

const PostCaption = ({ caption, ...props}: PostCaptionProps) => {
  return (
    <div className="flex gap-2">
      <p className="hidden lg:flex text-white font-semibold">{props.author?.username}</p>
      <p { ...props} className="text-white w-full text-wrap">
        { caption }
      </p>
    </div>
  )
}

export default PostCaption