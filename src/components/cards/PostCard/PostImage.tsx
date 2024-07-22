import React from "react";

interface PostImageProps {
    image: File
}

const PostImage = ({ image }: PostImageProps) => {
  return (
    <>
      <img 
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${image}`}
        alt="Post image"
        className="rounded"
        width={500}
        height={500}
      />
    </>
  )
}

export default PostImage