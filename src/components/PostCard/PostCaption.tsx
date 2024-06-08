import { ComponentPropsWithRef } from "react"

interface PostCaptionProps extends ComponentPropsWithRef<"p"> {
    caption: string
}

const PostCaption = ({ caption, ...props}: PostCaptionProps) => {
  return (
    <>
      <p { ...props} className="text-white w-full text-wrap">
        { caption }
      </p>
    </>
  )
}

export default PostCaption