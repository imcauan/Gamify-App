import { ComponentPropsWithRef } from "react"

interface PostImageProps extends ComponentPropsWithRef<"img"> {
    imageUrl: string
}

const PostImage = (props: PostImageProps) => {
  return (
    <img 
      src={props.imageUrl}
      className="w-full rounded-lg"
    />
  )
}

export default PostImage