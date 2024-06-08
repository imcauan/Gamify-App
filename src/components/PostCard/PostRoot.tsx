import React from "react"

interface PostCardProps {
  children: React.ReactNode
}

const PostRoot = ({ children }: PostCardProps) => {
  return (
    <div className="w-full p-4 flex flex-col gap-3">
      { children }
    </div>
  )
}

export default PostRoot